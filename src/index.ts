import * as core from '@actions/core'
import * as github from '@actions/github'
import { SummariseChanges, getChanges, postComment } from './steps/index.js'
import dotenv from 'dotenv'
import { Logger } from './utils.js'
import { getJiraTicket } from './steps/jira.js'
dotenv.config()
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const githubContext = github.context
    const pullRequestNumber = githubContext.payload.pull_request?.number
    if (!pullRequestNumber) {
      Logger.warn('Could not get pull request number from context, exiting')
      return
    }
    const jiraIssues = await getJiraTicket({
      title: githubContext.payload.pull_request?.title,
      branchName: githubContext.payload.pull_request?.head.ref,
      body: githubContext.payload.pull_request?.body
    })
    if (!jiraIssues.length) {
      Logger.warn('Could not get jira ticket, exiting')
      return
    }
    const changes = await getChanges(pullRequestNumber)
    if (!changes) {
      Logger.warn('Could not get changes, exiting')
      return
    }
    const gitSummary = await SummariseChanges.summarizeGitChanges(changes)
    const jiraSummary = await SummariseChanges.summariseJiraTickets(jiraIssues)
    if (!jiraSummary || !gitSummary) {
      Logger.warn('Summary is empty, exiting')
      return
    }
    const acsummaries = await SummariseChanges.checkedCodeReviewAgainstCriteria(gitSummary, jiraSummary)
    await postComment(pullRequestNumber, gitSummary)
    await postComment(pullRequestNumber, acsummaries)
  } catch (error) {
    core.setFailed((error as Error)?.message as string)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run().catch(error => core.setFailed('Workflow failed! ' + error.message))
