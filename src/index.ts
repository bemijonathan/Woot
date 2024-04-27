import core from '@actions/core'
import github from '@actions/github'
import { SummarizeChanges, getChanges, CommentHandler } from './steps'
import dotenv from 'dotenv'
dotenv.config()

import { Logger, Templates } from './utils.js'
import { Ai } from './ai'
import { GithubClient, JiraClient } from './clients'

// instantiate clients
const jiraClient = new JiraClient()
const githubClient = new GithubClient()
const commentsHandler = new CommentHandler(githubClient)
const ai = new Ai()

const githubContext = github.context

export async function run(): Promise<void> {
  try {
    const pullRequestNumber = githubContext.payload.pull_request?.number
    if (!pullRequestNumber) {
      Logger.warn('Could not get pull request number from context, exiting')
      return
    }

    const jiraIssues = await jiraClient.getJiraTicket({
      title: githubContext.payload.pull_request?.title,
      branchName: githubContext.payload.pull_request?.head.ref,
      body: `${githubContext.payload.pull_request?.body} ${githubContext.payload.pull_request?.head.ref}}`
    })

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
