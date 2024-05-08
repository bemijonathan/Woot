export interface IBaseClient {
  getTicketDetails(tickets: string[]): Promise<string[]>
}
