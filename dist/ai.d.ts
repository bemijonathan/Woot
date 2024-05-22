import OpenAI from 'openai';
export declare class Ai {
    constructor();
    configuration: {
        model: string;
    };
    model: OpenAI;
    basePromptTemplate: string;
    jiraPromptTemplate: string;
    acSummariesPromptTemplate: string;
    compareOldSummaryTemplate(oldSummary: string, newSummary: string): string;
    execute: (prompt: string) => Promise<string | null>;
}
