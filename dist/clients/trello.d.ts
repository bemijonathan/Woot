import { IBaseClient } from '../types/client';
type Credentials = {
    key: string;
    token: string;
};
export declare class TrelloClient implements IBaseClient {
    private readonly config;
    constructor(config: Credentials);
    getTicketDetails: (tickets: string[]) => Promise<any[]>;
}
export {};
//# sourceMappingURL=trello.d.ts.map