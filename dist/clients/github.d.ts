import { GitHub } from '@actions/github/lib/utils';
export declare class GithubClient {
    octokit: InstanceType<typeof GitHub>;
    repo: {
        owner: string;
        repo: string;
    };
    constructor();
    getGithubContext: () => {
        octokit: import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
            paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
        };
        repo: {
            owner: string;
            repo: string;
        };
        githubToken: string;
    };
    getComments(pullRequestNumber: number): Promise<{
        id: number;
        node_id: string;
        url: string;
        body?: string | undefined;
        body_text?: string | undefined;
        body_html?: string | undefined;
        html_url: string;
        user: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        created_at: string;
        updated_at: string;
        issue_url: string;
        author_association: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
        performed_via_github_app?: {
            id: number;
            slug?: string | undefined;
            node_id: string;
            owner: {
                name?: string | null | undefined;
                email?: string | null | undefined;
                login: string;
                id: number;
                node_id: string;
                avatar_url: string;
                gravatar_id: string | null;
                url: string;
                html_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                starred_url: string;
                subscriptions_url: string;
                organizations_url: string;
                repos_url: string;
                events_url: string;
                received_events_url: string;
                type: string;
                site_admin: boolean;
                starred_at?: string | undefined;
            } | null;
            name: string;
            description: string | null;
            external_url: string;
            html_url: string;
            created_at: string;
            updated_at: string;
            permissions: {
                issues?: string | undefined;
                checks?: string | undefined;
                metadata?: string | undefined;
                contents?: string | undefined;
                deployments?: string | undefined;
            } & {
                [key: string]: string;
            };
            events: string[];
            installations_count?: number | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            webhook_secret?: string | null | undefined;
            pem?: string | undefined;
        } | null | undefined;
        reactions?: {
            url: string;
            total_count: number;
            "+1": number;
            "-1": number;
            laugh: number;
            confused: number;
            heart: number;
            hooray: number;
            eyes: number;
            rocket: number;
        } | undefined;
    }[]>;
    postComment(comment: string, pullRequestNumber: number): Promise<void>;
}
//# sourceMappingURL=github.d.ts.map