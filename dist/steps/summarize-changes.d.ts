import { Ai } from '../ai.js';
export declare class SummarizeChanges {
    static summarizeGitChanges(diff: string, ai: Ai): Promise<string | null>;
    static summarizeJiraTickets(issues: string[], ai: Ai): Promise<string | null>;
    static checkedCodeReviewAgainstCriteria: (gitSummary: string, jiraSummary: string, ai: Ai) => Promise<string | null>;
}
//# sourceMappingURL=summarize-changes.d.ts.map