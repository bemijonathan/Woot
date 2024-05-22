import { Version2Client } from 'jira.js';
import { IBaseClient } from '../types/client';
type Credentials = {
    jiraEmail: string;
    jiraApiKey: string;
    jiraHost: string;
};
export declare class JiraClient implements IBaseClient {
    client: Version2Client;
    constructor(credentials: Credentials);
    getTicketDetails: (tickets: string[]) => Promise<string[]>;
    private initializeJiraClient;
}
export {};
//# sourceMappingURL=jira.d.ts.map