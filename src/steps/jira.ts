import { WebhookPayload } from "@actions/github/lib/interfaces"

export const getJiraTicket = (pr: WebhookPayload) => {
    const ticketRegex = /([A-Z]+-[0-9]+)/g
    const ticket = ticketRegex.exec(pr.pull_request?.body || '')

    if (ticket) {
        console.log('ticket', ticket)
        // TODO: add a rate limit to 5 request per seconds
    }
    return
}