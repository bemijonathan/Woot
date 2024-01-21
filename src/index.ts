import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  SummariseChanges,
  getChanges,
  postSummary,
  getJiraTicket,
  Ai,
  postComment
} from './steps'
import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

import { Logger } from './utils.js'
import { mockdata } from './mockdata'

export async function run(): Promise<void> {
  try {
    // const githubContext = mockdata
    const githubContext = github.context
    const pullRequestNumber = githubContext.payload.pull_request?.number
    if (!pullRequestNumber) {
      Logger.warn('Could not get pull request number from context, exiting')
      return
    }
    const jiraIssues = await getJiraTicket({
      title: githubContext.payload.pull_request?.title,
      branchName: githubContext.payload.pull_request?.head.ref,
      body: `${githubContext.payload.pull_request?.body} ${githubContext.payload.pull_request?.head.ref}}`
    })
    if (!jiraIssues.length) {
      Logger.warn('Could not get jira ticket, exiting')
      return
    }
    const changes = await getChanges(pullRequestNumber)
    if (!changes) {
      Logger.warn('Could not get changes, exiting')
      await postComment(
        `
        **⚠️ Warning:**
        No git changes found in this pull request.
        `,
        pullRequestNumber
      )

      return
    }

    const ai = new Ai()
    const gitSummary = await SummariseChanges.summarizeGitChanges(changes, ai)
    const jiraSummary = await SummariseChanges.summariseJiraTickets(
      jiraIssues,
      ai
    )
    if (!jiraSummary || !gitSummary) {
      Logger.warn('Summary is empty, exiting')
      await postComment(
        `
        **⚠️ Warning:**
        No jira ticket found.
        `,
        pullRequestNumber
      )
      return
    }
    const acSummaries = await SummariseChanges.checkedCodeReviewAgainstCriteria(
      gitSummary,
      jiraSummary,
      ai
    )
    await postSummary(pullRequestNumber, acSummaries ?? '', ai)
  } catch (error) {
    core.setFailed((error as Error)?.message as string)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run().catch(error => core.setFailed('Workflow failed! ' + error.message))
