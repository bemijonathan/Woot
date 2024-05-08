import { Logger } from '../utils'
import { TrelloClient } from './trello'
import { JiraClient } from './jira'

export class BaseClient {
  static get client(): TrelloClient | JiraClient | null {
    const trelloCredentials = {
      trelloPublicKey: process.env.TRELLO_PUBLIC_KEY,
      trelloPrivateKey: process.env.TRELLO_PRIVATE_KEY
    }

    if (this.validateCredentials(trelloCredentials)) {
      return new TrelloClient()
    }

    const jiraCredentials: Record<string, unknown> = {
      jiraApiKey: process.env.JIRA_API_KEY,
      jiraEmail: process.env.JIRA_EMAIL,
      jiraHost: process.env.JIRA_HOST
    }

    if (this.validateCredentials(jiraCredentials)) {
      return new JiraClient()
    }

    return null
  }

  static validateCredentials(credential: Record<string, unknown>) {
    if (Object.values(credential).filter(e => Boolean(e)).length > 0) {
      Object.keys(credential).forEach(e => {
        if (!credential[e]) {
          Logger.error(`${e} configuration is missing`)
          return false
        }
      })
      return true
    }
  }
}
