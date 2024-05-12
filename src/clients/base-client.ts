import { Logger } from '../utils'
import * as core from '@actions/core'
import { TrelloClient } from './trello'
import { JiraClient } from './jira'

export class BaseClient {
  static get client(): TrelloClient | JiraClient | null {
    const trelloCredentials = {
      key:
        core.getInput('trelloPublicKey') || process.env.TRELLO_PUBLIC_KEY || '',
      token:
        core.getInput('trelloPrivateKey') ||
        process.env.TRELLO_PRIVATE_KEY ||
        ''
    }

    if (this.validateCredentials(trelloCredentials)) {
      return new TrelloClient(trelloCredentials)
    }

    const jiraCredentials = {
      jiraApiKey: core.getInput('jiraApiKey') || process.env.JIRA_API_KEY || '',
      jiraEmail: core.getInput('jiraEmail') || process.env.JIRA_EMAIL || '',
      jiraHost: core.getInput('jiraHost') || process.env.JIRA_HOST || ''
    } as const

    if (this.validateCredentials(jiraCredentials)) {
      return new JiraClient(jiraCredentials)
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
