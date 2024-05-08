import { Logger } from '../utils'
import { IBaseClient } from '../types/client'

const fetch = require('node-fetch')

const trelloBaseUrl: string = 'https://api.trello.com/1/cards'

export class TrelloClient implements IBaseClient {
  config: {
    key: string
    token: string
  }

  constructor() {
    this.config = {
      key: process.env.TRELLO_PRIVATE_KEY ?? '',
      token: process.env.TRELLO_PRIVATE_TOKEN ?? ''
    }
  }

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
