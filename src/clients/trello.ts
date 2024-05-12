import { Logger } from '../utils'
import { IBaseClient } from '../types/client'

const fetch = require('node-fetch')

const trelloBaseUrl: string = 'https://api.trello.com/1/cards'

type Credentials = {
  key: string
  token: string
}

export class TrelloClient implements IBaseClient {
  constructor(private readonly config: Credentials) {}

  getTicketDetails = async (tickets: string[]) => {
    const issues = await Promise.all(
      tickets.map(async ticket => {
        try {
          const data = await fetch(
            trelloBaseUrl + new URLSearchParams(this.config).toString(),
            {
              method: 'GET'
            }
          )
          const d = await data.json()

          return d['desc']
        } catch (error) {
          Logger.error(`Error while fetching ${ticket} from `)
        }
      })
    )

    return issues.map(e => e)
  }
}
