import { Ai } from '../ai';
import { GithubClient } from '../clients';
export declare class CommentHandler {
    private readonly repoClient;
    constructor(repoClient: GithubClient);
    SIGNATURE: string;
    postSummary(pullRequestNumber: number, summary: string, ai: Ai): Promise<void>;
    postComment: (comment: string, pullRequestNumber: number) => Promise<void>;
}
//# sourceMappingURL=comments-handler.d.ts.map