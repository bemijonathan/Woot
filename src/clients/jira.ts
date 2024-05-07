import { Version2Client } from 'jira.js'
import { Issue } from 'jira.js/out/version2/models'
import * as core from '@actions/core'

import { Logger } from '../utils'
import { IBaseClient, TicketInformation } from './base-client'

export class JiraClient implements IBaseClient {
  client: Version2Client
  constructor() {
    this.client = this.initializeJiraClient()
  }
  private initializeJiraClient = () => {
    const host = core.getInput('jiraHost') || process.env.JIRA_HOST || ''
    return new Version2Client({
      host,
      authentication: {
        basic: {
          email: core.getInput('jiraEmail') || process.env.JIRA_EMAIL || '',
          apiToken:
            core.getInput('jiraApiKey') || process.env.JIRA_API_KEY || ''
        }
      }
    })
  }
  getTicket = async (tickets: string[]): Promise<Issue[]> => {
    const issues = await Promise.all(
      tickets.map(async t => {
        try {
          const issue = await this.client.issues.getIssue({
            issueIdOrKey: t
          })
          return issue.fields.description
        } catch (e) {
          Logger.error(`Error while fetching ${t} from JIRA`)
        }
      })
    )
    return issues.filter(e => e) as unknown as Issue[]
  }
}
