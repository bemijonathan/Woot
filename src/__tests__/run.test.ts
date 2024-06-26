import { mockdata } from '../mockdata'
import { run } from '../index'
import * as github from '@actions/github'
import { getChanges, SummarizeChanges } from '../steps'
import * as core from '@actions/core'
import { JiraClient } from '../clients'

jest.mock('@actions/github')
jest.mock('./services')
jest.mock('@actions/core')

describe('run', () => {
  const jira = jest.fn(() => {
    return {
      getJiraTicket: jest.fn(() => ['JIRA-123'])
    }
  })
  it('should execute without errors', async () => {
    const jiraIssues = ['JIRA-123']
    const changes = ['Change 1', 'Change 2']
    const gitSummary = 'Git Summary'
    const jiraSummary = 'JIRA Summary'
    const acsummaries = 'Summary'

    const githubContext = mockdata

    // await run()

    // expect(getJiraTicket).toHaveBeenCalledWith({
    //   title: githubContext.payload.pull_request.title,
    //   branchName: githubContext.payload.pull_request.head.ref,
    //   body: githubContext.payload.pull_request.body
    // })

    // expect(getChanges).toHaveBeenCalledWith(
    //   githubContext.payload.pull_request.number
    // )
    // expect(SummariseChanges.summarizeGitChanges).toHaveBeenCalledWith(changes)
    // expect(SummariseChanges.summariseJiraTickets).toHaveBeenCalledWith(
    //   jiraIssues
    // )
    // expect(
    //   SummariseChanges.checkedCodeReviewAgainstCriteria
    // ).toHaveBeenCalledWith(gitSummary, jiraSummary)
    // expect(postComment).toHaveBeenCalledWith(
    //   githubContext.payload.pull_request.number,
    //   gitSummary
    // )
  })

  it('should handle errors', async () => {
    const githubContext = {
      payload: {
        pull_request: {
          number: 1,
          title: 'Test PR',
          head: {
            ref: 'test-branch'
          },
          body: 'Test PR body'
        }
      }
    }

    // github.context = githubContext
    // getJiraTicket.mockRejectedValue(new Error('Test Error'))

    await run()

    expect(core.setFailed).toHaveBeenCalledWith('Test Error')
  })
})
