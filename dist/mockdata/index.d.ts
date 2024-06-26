export type GithubContext = typeof mockdata;
export declare const mockdata: {
    payload: {
        action: string;
        number: number;
        pull_request: {
            _links: {
                comments: {
                    href: string;
                };
                commits: {
                    href: string;
                };
                html: {
                    href: string;
                };
                issue: {
                    href: string;
                };
                review_comment: {
                    href: string;
                };
                review_comments: {
                    href: string;
                };
                self: {
                    href: string;
                };
                statuses: {
                    href: string;
                };
            };
            active_lock_reason: null;
            additions: number;
            assignee: null;
            assignees: never[];
            author_association: string;
            auto_merge: null;
            base: {
                label: string;
                ref: string;
                repo: {
                    allow_auto_merge: boolean;
                    allow_forking: boolean;
                    allow_merge_commit: boolean;
                    allow_rebase_merge: boolean;
                    allow_squash_merge: boolean;
                    allow_update_branch: boolean;
                    archive_url: string;
                    archived: boolean;
                    assignees_url: string;
                    blobs_url: string;
                    branches_url: string;
                    clone_url: string;
                    collaborators_url: string;
                    comments_url: string;
                    commits_url: string;
                    compare_url: string;
                    contents_url: string;
                    contributors_url: string;
                    created_at: string;
                    default_branch: string;
                    delete_branch_on_merge: boolean;
                    deployments_url: string;
                    description: string;
                    disabled: boolean;
                    downloads_url: string;
                    events_url: string;
                    fork: boolean;
                    forks: number;
                    forks_count: number;
                    forks_url: string;
                    full_name: string;
                    git_commits_url: string;
                    git_refs_url: string;
                    git_tags_url: string;
                    git_url: string;
                    has_discussions: boolean;
                    has_downloads: boolean;
                    has_issues: boolean;
                    has_pages: boolean;
                    has_projects: boolean;
                    has_wiki: boolean;
                    homepage: string;
                    hooks_url: string;
                    html_url: string;
                    id: number;
                    is_template: boolean;
                    issue_comment_url: string;
                    issue_events_url: string;
                    issues_url: string;
                    keys_url: string;
                    labels_url: string;
                    language: string;
                    languages_url: string;
                    license: {
                        key: string;
                        name: string;
                        node_id: string;
                        spdx_id: string;
                        url: string;
                    };
                    merge_commit_message: string;
                    merge_commit_title: string;
                    merges_url: string;
                    milestones_url: string;
                    mirror_url: null;
                    name: string;
                    node_id: string;
                    notifications_url: string;
                    open_issues: number;
                    open_issues_count: number;
                    owner: {
                        avatar_url: string;
                        events_url: string;
                        followers_url: string;
                        following_url: string;
                        gists_url: string;
                        gravatar_id: string;
                        html_url: string;
                        id: number;
                        login: string;
                        node_id: string;
                        organizations_url: string;
                        received_events_url: string;
                        repos_url: string;
                        site_admin: boolean;
                        starred_url: string;
                        subscriptions_url: string;
                        type: string;
                        url: string;
                    };
                    private: boolean;
                    pulls_url: string;
                    pushed_at: string;
                    releases_url: string;
                    size: number;
                    squash_merge_commit_message: string;
                    squash_merge_commit_title: string;
                    ssh_url: string;
                    stargazers_count: number;
                    stargazers_url: string;
                    statuses_url: string;
                    subscribers_url: string;
                    subscription_url: string;
                    svn_url: string;
                    tags_url: string;
                    teams_url: string;
                    topics: never[];
                    trees_url: string;
                    updated_at: string;
                    url: string;
                    use_squash_pr_title_as_default: boolean;
                    visibility: string;
                    watchers: number;
                    watchers_count: number;
                    web_commit_signoff_required: boolean;
                };
                sha: string;
                user: {
                    avatar_url: string;
                    events_url: string;
                    followers_url: string;
                    following_url: string;
                    gists_url: string;
                    gravatar_id: string;
                    html_url: string;
                    id: number;
                    login: string;
                    node_id: string;
                    organizations_url: string;
                    received_events_url: string;
                    repos_url: string;
                    site_admin: boolean;
                    starred_url: string;
                    subscriptions_url: string;
                    type: string;
                    url: string;
                };
            };
            body: null;
            changed_files: number;
            closed_at: null;
            comments: number;
            comments_url: string;
            commits: number;
            commits_url: string;
            created_at: string;
            deletions: number;
            diff_url: string;
            draft: boolean;
            head: {
                label: string;
                ref: string;
                repo: {
                    allow_auto_merge: boolean;
                    allow_forking: boolean;
                    allow_merge_commit: boolean;
                    allow_rebase_merge: boolean;
                    allow_squash_merge: boolean;
                    allow_update_branch: boolean;
                    archive_url: string;
                    archived: boolean;
                    assignees_url: string;
                    blobs_url: string;
                    branches_url: string;
                    clone_url: string;
                    collaborators_url: string;
                    comments_url: string;
                    commits_url: string;
                    compare_url: string;
                    contents_url: string;
                    contributors_url: string;
                    created_at: string;
                    default_branch: string;
                    delete_branch_on_merge: boolean;
                    deployments_url: string;
                    description: string;
                    disabled: boolean;
                    downloads_url: string;
                    events_url: string;
                    fork: boolean;
                    forks: number;
                    forks_count: number;
                    forks_url: string;
                    full_name: string;
                    git_commits_url: string;
                    git_refs_url: string;
                    git_tags_url: string;
                    git_url: string;
                    has_discussions: boolean;
                    has_downloads: boolean;
                    has_issues: boolean;
                    has_pages: boolean;
                    has_projects: boolean;
                    has_wiki: boolean;
                    homepage: string;
                    hooks_url: string;
                    html_url: string;
                    id: number;
                    is_template: boolean;
                    issue_comment_url: string;
                    issue_events_url: string;
                    issues_url: string;
                    keys_url: string;
                    labels_url: string;
                    language: string;
                    languages_url: string;
                    license: {
                        key: string;
                        name: string;
                        node_id: string;
                        spdx_id: string;
                        url: string;
                    };
                    merge_commit_message: string;
                    merge_commit_title: string;
                    merges_url: string;
                    milestones_url: string;
                    mirror_url: null;
                    name: string;
                    node_id: string;
                    notifications_url: string;
                    open_issues: number;
                    open_issues_count: number;
                    owner: {
                        avatar_url: string;
                        events_url: string;
                        followers_url: string;
                        following_url: string;
                        gists_url: string;
                        gravatar_id: string;
                        html_url: string;
                        id: number;
                        login: string;
                        node_id: string;
                        organizations_url: string;
                        received_events_url: string;
                        repos_url: string;
                        site_admin: boolean;
                        starred_url: string;
                        subscriptions_url: string;
                        type: string;
                        url: string;
                    };
                    private: boolean;
                    pulls_url: string;
                    pushed_at: string;
                    releases_url: string;
                    size: number;
                    squash_merge_commit_message: string;
                    squash_merge_commit_title: string;
                    ssh_url: string;
                    stargazers_count: number;
                    stargazers_url: string;
                    statuses_url: string;
                    subscribers_url: string;
                    subscription_url: string;
                    svn_url: string;
                    tags_url: string;
                    teams_url: string;
                    topics: never[];
                    trees_url: string;
                    updated_at: string;
                    url: string;
                    use_squash_pr_title_as_default: boolean;
                    visibility: string;
                    watchers: number;
                    watchers_count: number;
                    web_commit_signoff_required: boolean;
                };
                sha: string;
                user: {
                    avatar_url: string;
                    events_url: string;
                    followers_url: string;
                    following_url: string;
                    gists_url: string;
                    gravatar_id: string;
                    html_url: string;
                    id: number;
                    login: string;
                    node_id: string;
                    organizations_url: string;
                    received_events_url: string;
                    repos_url: string;
                    site_admin: boolean;
                    starred_url: string;
                    subscriptions_url: string;
                    type: string;
                    url: string;
                };
            };
            html_url: string;
            id: number;
            issue_url: string;
            labels: never[];
            locked: boolean;
            maintainer_can_modify: boolean;
            merge_commit_sha: null;
            mergeable: null;
            mergeable_state: string;
            merged: boolean;
            merged_at: null;
            merged_by: null;
            milestone: null;
            node_id: string;
            number: number;
            patch_url: string;
            rebaseable: null;
            requested_reviewers: never[];
            requested_teams: never[];
            review_comment_url: string;
            review_comments: number;
            review_comments_url: string;
            state: string;
            statuses_url: string;
            title: string;
            updated_at: string;
            url: string;
            user: {
                avatar_url: string;
                events_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                gravatar_id: string;
                html_url: string;
                id: number;
                login: string;
                node_id: string;
                organizations_url: string;
                received_events_url: string;
                repos_url: string;
                site_admin: boolean;
                starred_url: string;
                subscriptions_url: string;
                type: string;
                url: string;
            };
        };
        repository: {
            allow_forking: boolean;
            archive_url: string;
            archived: boolean;
            assignees_url: string;
            blobs_url: string;
            branches_url: string;
            clone_url: string;
            collaborators_url: string;
            comments_url: string;
            commits_url: string;
            compare_url: string;
            contents_url: string;
            contributors_url: string;
            created_at: string;
            default_branch: string;
            deployments_url: string;
            description: string;
            disabled: boolean;
            downloads_url: string;
            events_url: string;
            fork: boolean;
            forks: number;
            forks_count: number;
            forks_url: string;
            full_name: string;
            git_commits_url: string;
            git_refs_url: string;
            git_tags_url: string;
            git_url: string;
            has_discussions: boolean;
            has_downloads: boolean;
            has_issues: boolean;
            has_pages: boolean;
            has_projects: boolean;
            has_wiki: boolean;
            homepage: string;
            hooks_url: string;
            html_url: string;
            id: number;
            is_template: boolean;
            issue_comment_url: string;
            issue_events_url: string;
            issues_url: string;
            keys_url: string;
            labels_url: string;
            language: string;
            languages_url: string;
            license: {
                key: string;
                name: string;
                node_id: string;
                spdx_id: string;
                url: string;
            };
            merges_url: string;
            milestones_url: string;
            mirror_url: null;
            name: string;
            node_id: string;
            notifications_url: string;
            open_issues: number;
            open_issues_count: number;
            owner: {
                avatar_url: string;
                events_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                gravatar_id: string;
                html_url: string;
                id: number;
                login: string;
                node_id: string;
                organizations_url: string;
                received_events_url: string;
                repos_url: string;
                site_admin: boolean;
                starred_url: string;
                subscriptions_url: string;
                type: string;
                url: string;
            };
            private: boolean;
            pulls_url: string;
            pushed_at: string;
            releases_url: string;
            size: number;
            ssh_url: string;
            stargazers_count: number;
            stargazers_url: string;
            statuses_url: string;
            subscribers_url: string;
            subscription_url: string;
            svn_url: string;
            tags_url: string;
            teams_url: string;
            topics: never[];
            trees_url: string;
            updated_at: string;
            url: string;
            visibility: string;
            watchers: number;
            watchers_count: number;
            web_commit_signoff_required: boolean;
        };
        sender: {
            avatar_url: string;
            events_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            gravatar_id: string;
            html_url: string;
            id: number;
            login: string;
            node_id: string;
            organizations_url: string;
            received_events_url: string;
            repos_url: string;
            site_admin: boolean;
            starred_url: string;
            subscriptions_url: string;
            type: string;
            url: string;
        };
    };
    eventName: string;
    sha: string;
    ref: string;
    workflow: string;
    action: string;
    actor: string;
    job: string;
    runNumber: number;
    runId: number;
    apiUrl: string;
    serverUrl: string;
    graphqlUrl: string;
};
//# sourceMappingURL=index.d.ts.map