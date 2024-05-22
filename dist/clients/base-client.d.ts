import { TrelloClient } from './trello';
import { JiraClient } from './jira';
export declare class BaseClient {
    static get client(): TrelloClient | JiraClient | null;
    static validateCredentials(credential: Record<string, unknown>): true | undefined;
}
//# sourceMappingURL=base-client.d.ts.map