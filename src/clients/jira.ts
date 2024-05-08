import { Version2Client } from 'jira.js'
import * as core from '@actions/core'

import { Logger } from '../utils'
import { IBaseClient } from '../types/client'

export class JiraClient implements IBaseClient {
  client: Version2Client

  constructor() {
    this.client = this.initializeJiraClient()
  }

  getTicketDetails = async (tickets: string[]): Promise<string[]> => {
    const issues: string[] = await Promise.all(
      tickets.map(async t => {
        try {
          const issue = await this.client.issues.getIssue({
            issueIdOrKey: t
          })
          return issue.fields.description ?? ''
        } catch (e) {
          Logger.error(`Error while fetching ${t} from JIRA`)
          return ''
        }
      })
    )
    return issues.filter(Boolean)
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
}
