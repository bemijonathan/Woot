import { Version2Client } from 'jira.js'

import { Logger } from '../utils'
import { IBaseClient } from '../types/client'

type Credentials = {
  jiraEmail: string
  jiraApiKey: string
  jiraHost: string
}

export class JiraClient implements IBaseClient {
  client: Version2Client

  constructor(credentials: Credentials) {
    this.client = this.initializeJiraClient(credentials)
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

  private initializeJiraClient = ({
    jiraHost,
    jiraEmail,
    jiraApiKey
  }: Credentials) => {
    return new Version2Client({
      host: jiraHost,
      authentication: {
        basic: {
          email: jiraEmail,
          apiToken: jiraApiKey
        }
      }
    })
  }
}
