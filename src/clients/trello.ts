import { IBaseClient, TicketInformation } from './base-client'

const trelloBaseUrl = 'https://api.trello.com/1';

export class JiraClient implements IBaseClient {
  constructor() {}

  getTicket = async (
    ticketInformation: TicketInformation
  ):  => {
    // implementation
  }
}
