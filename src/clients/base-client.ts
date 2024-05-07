import { Issue } from 'jira.js/out/version2/models'
import { ITrello } from '../types/trello'

export type TicketInformation = {
  title?: string
  branchName: string
  body?: string
}
export interface IBaseClient {
  getTicket(tickets: string[]): Promise<Issue[] | ITrello[]>
}
