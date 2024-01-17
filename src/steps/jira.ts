import { WebhookPayload } from "@actions/github/lib/interfaces"
import { Version3Client } from 'jira.js'
import { Issue } from "jira.js/out/agile/models"
import * as core from '@actions/core'

import { Logger } from "src/utils"

const initializeJiraClient = () => {
    return new Version3Client({
        host: core.getInput('jiraHost'),
        authentication: {
            basic: {
                email: core.getInput('jiraEmail'),
                apiToken: core.getInput('jiraApiKey')
            }
        }
    })
}

const jiraClient = initializeJiraClient()


export const getJiraTicket = async ({
    title , branchName, body
    }:{
        title?:string, 
        branchName :string, 
        body?:string,
    }): Promise<Issue[]> => {
        const ticketRegex = /([A-Z]+-[0-9]+)/g
        const allTickets = (`${body} ${branchName} ${title}`|| '').match(ticketRegex)
        if (!allTickets?.length) return []
        const ticket = [...new Set(allTickets)]
        const issues = await Promise.all(ticket.map(async (t) => {
            try {
                const issue = await jiraClient.issues.getIssue({
                    issueIdOrKey: t
                })
                return issue
            } catch (e) {
                Logger.error(`Error while fetching ${t} from JIRA`)
            }
        }))
        return issues.filter(e => !e) as unknown as Issue[]
}

