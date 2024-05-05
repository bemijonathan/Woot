import { Issue } from 'jira.js/out/version2/models'

export type TicketInformation = {
  title?: string
  branchName: string
  body?: string
}
export interface IBaseClient {
  getTicket(ticketInformation: TicketInformation): Promise<Issue[]>
}
