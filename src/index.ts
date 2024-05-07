import * as core from '@actions/core'
import * as github from '@actions/github'
import { SummarizeChanges, getChanges, CommentHandler } from './steps'
import dotenv from 'dotenv'
dotenv.config()

import { Logger, Templates } from './utils.js'
import { Ai } from './ai'
import { GithubClient, JiraClient } from './clients'
import { mockdata } from './mockdata'

// instantiate clients
const jiraClient = new JiraClient()
const githubClient = new GithubClient()
const commentsHandler = new CommentHandler(githubClient)
const ai = new Ai()

export async function run(): Promise<void> {
  try {
    const githubContext =
      process.env.NODE_ENV === 'local' ? mockdata : github.context
    const pullRequestNumber = githubContext.payload.pull_request?.number
    if (!pullRequestNumber) {
      Logger.warn('Could not get pull request number from context, exiting')
      return
    }

    const pullRequestTitle = githubContext.payload.pull_request?.title
    const pullRequestbranchName = githubContext.payload.pull_request?.head.ref
    const pullRequestBody = `${githubContext.payload.pull_request?.body} ${githubContext.payload.pull_request?.head.ref}}`

    const ticketRegex = /([A-Z]+-[0-9]+)/g
    const allTickets = (
      `${pullRequestBody} ${pullRequestbranchName} ${pullRequestTitle}` || ''
    ).match(ticketRegex)
    if (!allTickets?.length) return
    const tickets = [...new Set(allTickets)]

    const jiraIssues = await jiraClient.getTicket(tickets)

    if (!jiraIssues.length) {
      Logger.warn('Could not get jira ticket, exiting')
      await commentsHandler.postComment(
        Templates.warning(
          'No jira ticket found in this pull request, exiting.'
        ),
        pullRequestNumber
      )
      return
    }

    const changes = await getChanges(pullRequestNumber)
    if (!changes) {
      Logger.warn('Could not get changes, exiting')
      await commentsHandler.postComment(
        Templates.warning('No git changes found in this pull request.'),
        pullRequestNumber
      )
      return
    }

    const [gitSummary, jiraSummary] = await Promise.all([
      SummarizeChanges.summarizeGitChanges(changes, ai),
      SummarizeChanges.summarizeJiraTickets(jiraIssues, ai)
    ])

    if (!jiraSummary || !gitSummary) {
      Logger.warn('No jira ticket found or Summary is empty, exiting')
      await commentsHandler.postComment(
        Templates.warning('No matching jira ticket found.'),
        pullRequestNumber
      )
      return
    }

    const acSummaries = await SummarizeChanges.checkedCodeReviewAgainstCriteria(
      gitSummary,
      jiraSummary,
      ai
    )

    await commentsHandler.postSummary(pullRequestNumber, acSummaries ?? '', ai)
  } catch (error) {
    core.setFailed((error as Error)?.message as string)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run().catch(error => core.setFailed('Workflow failed! ' + error.message))
