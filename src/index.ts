import * as core from '@actions/core'
import * as github from '@actions/github'
import { CommentHandler, getChanges, SummarizeChanges } from './steps'
import dotenv from 'dotenv'
import { Logger, Templates } from './utils.js'
import { Ai } from './ai'
import { BaseClient, GithubClient } from './clients'

dotenv.config()

// instantiate clients
const githubClient = new GithubClient()
const commentsHandler = new CommentHandler(githubClient)
const ai = new Ai()

const getTicketsFromPullRequestDetails = (
  githubContext: typeof github.context.payload
) => {
  const pullRequestTitle = githubContext.payload.pull_request?.title
  const pullRequestbranchName = githubContext.payload.pull_request?.head.ref
  const pullRequestBody = `${githubContext.payload.pull_request?.body} ${githubContext.payload.pull_request?.head.ref}}`

  const ticketRegex = /([A-Z]+-[0-9]+)/g
  const allTickets = (
    `${pullRequestBody} ${pullRequestbranchName} ${pullRequestTitle}` || ''
  ).match(ticketRegex)
  return [...new Set(allTickets)]
}

export async function run(): Promise<void> {
  try {
    const githubContext = github.context

    console.log(githubContext, 'githubContext')
    const pullRequestNumber = githubContext.payload.pull_request?.number

    if (!pullRequestNumber || !githubContext.payload) {
      Logger.warn('Could not get pull request number from context, exiting')
      return
    }

    const tickets = getTicketsFromPullRequestDetails(githubContext.payload)

    if (!tickets.length)
      return Logger.warn(
        'Could not get pull request number from context, exiting'
      )

    const client = BaseClient.client

    if (!client) return Logger.error('No client credential is set up.')

    const jiraIssues = await client.getTicketDetails(tickets)

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
