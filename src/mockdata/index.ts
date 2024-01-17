export type GithubContext = typeof mockdata
export const mockdata = {
  payload: {
    action: 'opened',
    number: 24,
    pull_request: {
      _links: {
        comments: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/issues/24/comments'
        },
        commits: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/pulls/24/commits'
        },
        html: { href: 'https://github.com/bemijonathan/Woot/pull/24' },
        issue: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/issues/24'
        },
        review_comment: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/pulls/comments{/number}'
        },
        review_comments: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/pulls/24/comments'
        },
        self: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/pulls/24'
        },
        statuses: {
          href: 'https://api.github.com/repos/bemijonathan/Woot/statuses/0a3c488672ddba0ca73735a879fd44bb31f31dfe'
        }
      },
      active_lock_reason: null,
      additions: 17,
      assignee: null,
      assignees: [],
      author_association: 'OWNER',
      auto_merge: null,
      base: {
        label: 'bemijonathan:main',
        ref: 'main',
        repo: {
          allow_auto_merge: false,
          allow_forking: true,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          allow_squash_merge: true,
          allow_update_branch: false,
          archive_url:
            'https://api.github.com/repos/bemijonathan/Woot/{archive_format}{/ref}',
          archived: false,
          assignees_url:
            'https://api.github.com/repos/bemijonathan/Woot/assignees{/user}',
          blobs_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/blobs{/sha}',
          branches_url:
            'https://api.github.com/repos/bemijonathan/Woot/branches{/branch}',
          clone_url: 'https://github.com/bemijonathan/Woot.git',
          collaborators_url:
            'https://api.github.com/repos/bemijonathan/Woot/collaborators{/collaborator}',
          comments_url:
            'https://api.github.com/repos/bemijonathan/Woot/comments{/number}',
          commits_url:
            'https://api.github.com/repos/bemijonathan/Woot/commits{/sha}',
          compare_url:
            'https://api.github.com/repos/bemijonathan/Woot/compare/{base}...{head}',
          contents_url:
            'https://api.github.com/repos/bemijonathan/Woot/contents/{+path}',
          contributors_url:
            'https://api.github.com/repos/bemijonathan/Woot/contributors',
          created_at: '2023-08-31T09:04:07Z',
          default_branch: 'main',
          delete_branch_on_merge: false,
          deployments_url:
            'https://api.github.com/repos/bemijonathan/Woot/deployments',
          description:
            'Woot ai 🤘 specs to code checker, it checks your specification and your code for correctness and completeness',
          disabled: false,
          downloads_url:
            'https://api.github.com/repos/bemijonathan/Woot/downloads',
          events_url: 'https://api.github.com/repos/bemijonathan/Woot/events',
          fork: false,
          forks: 0,
          forks_count: 0,
          forks_url: 'https://api.github.com/repos/bemijonathan/Woot/forks',
          full_name: 'bemijonathan/Woot',
          git_commits_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/commits{/sha}',
          git_refs_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/refs{/sha}',
          git_tags_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/tags{/sha}',
          git_url: 'git://github.com/bemijonathan/Woot.git',
          has_discussions: false,
          has_downloads: true,
          has_issues: true,
          has_pages: false,
          has_projects: true,
          has_wiki: false,
          homepage: '',
          hooks_url: 'https://api.github.com/repos/bemijonathan/Woot/hooks',
          html_url: 'https://github.com/bemijonathan/Woot',
          id: 685452504,
          is_template: false,
          issue_comment_url:
            'https://api.github.com/repos/bemijonathan/Woot/issues/comments{/number}',
          issue_events_url:
            'https://api.github.com/repos/bemijonathan/Woot/issues/events{/number}',
          issues_url:
            'https://api.github.com/repos/bemijonathan/Woot/issues{/number}',
          keys_url:
            'https://api.github.com/repos/bemijonathan/Woot/keys{/key_id}',
          labels_url:
            'https://api.github.com/repos/bemijonathan/Woot/labels{/name}',
          language: 'TypeScript',
          languages_url:
            'https://api.github.com/repos/bemijonathan/Woot/languages',
          license: {
            key: 'mit',
            name: 'MIT License',
            node_id: 'MDc6TGljZW5zZTEz',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit'
          },
          merge_commit_message: 'PR_TITLE',
          merge_commit_title: 'MERGE_MESSAGE',
          merges_url: 'https://api.github.com/repos/bemijonathan/Woot/merges',
          milestones_url:
            'https://api.github.com/repos/bemijonathan/Woot/milestones{/number}',
          mirror_url: null,
          name: 'Woot',
          node_id: 'R_kgDOKNss2A',
          notifications_url:
            'https://api.github.com/repos/bemijonathan/Woot/notifications{?since,all,participating}',
          open_issues: 1,
          open_issues_count: 1,
          owner: {
            avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
            events_url:
              'https://api.github.com/users/bemijonathan/events{/privacy}',
            followers_url:
              'https://api.github.com/users/bemijonathan/followers',
            following_url:
              'https://api.github.com/users/bemijonathan/following{/other_user}',
            gists_url:
              'https://api.github.com/users/bemijonathan/gists{/gist_id}',
            gravatar_id: '',
            html_url: 'https://github.com/bemijonathan',
            id: 34762800,
            login: 'bemijonathan',
            node_id: 'MDQ6VXNlcjM0NzYyODAw',
            organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
            received_events_url:
              'https://api.github.com/users/bemijonathan/received_events',
            repos_url: 'https://api.github.com/users/bemijonathan/repos',
            site_admin: false,
            starred_url:
              'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/bemijonathan/subscriptions',
            type: 'User',
            url: 'https://api.github.com/users/bemijonathan'
          },
          private: false,
          pulls_url:
            'https://api.github.com/repos/bemijonathan/Woot/pulls{/number}',
          pushed_at: '2024-01-17T18:11:33Z',
          releases_url:
            'https://api.github.com/repos/bemijonathan/Woot/releases{/id}',
          size: 1912,
          squash_merge_commit_message: 'COMMIT_MESSAGES',
          squash_merge_commit_title: 'COMMIT_OR_PR_TITLE',
          ssh_url: 'git@github.com:bemijonathan/Woot.git',
          stargazers_count: 0,
          stargazers_url:
            'https://api.github.com/repos/bemijonathan/Woot/stargazers',
          statuses_url:
            'https://api.github.com/repos/bemijonathan/Woot/statuses/{sha}',
          subscribers_url:
            'https://api.github.com/repos/bemijonathan/Woot/subscribers',
          subscription_url:
            'https://api.github.com/repos/bemijonathan/Woot/subscription',
          svn_url: 'https://github.com/bemijonathan/Woot',
          tags_url: 'https://api.github.com/repos/bemijonathan/Woot/tags',
          teams_url: 'https://api.github.com/repos/bemijonathan/Woot/teams',
          topics: [],
          trees_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/trees{/sha}',
          updated_at: '2024-01-17T17:31:15Z',
          url: 'https://api.github.com/repos/bemijonathan/Woot',
          use_squash_pr_title_as_default: false,
          visibility: 'public',
          watchers: 0,
          watchers_count: 0,
          web_commit_signoff_required: false
        },
        sha: '069ea254a33fa12f609842be63eb3003f3ef77aa',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
          events_url:
            'https://api.github.com/users/bemijonathan/events{/privacy}',
          followers_url: 'https://api.github.com/users/bemijonathan/followers',
          following_url:
            'https://api.github.com/users/bemijonathan/following{/other_user}',
          gists_url:
            'https://api.github.com/users/bemijonathan/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/bemijonathan',
          id: 34762800,
          login: 'bemijonathan',
          node_id: 'MDQ6VXNlcjM0NzYyODAw',
          organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
          received_events_url:
            'https://api.github.com/users/bemijonathan/received_events',
          repos_url: 'https://api.github.com/users/bemijonathan/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/bemijonathan/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/bemijonathan'
        }
      },
      body: null,
      changed_files: 6,
      closed_at: null,
      comments: 0,
      comments_url:
        'https://api.github.com/repos/bemijonathan/Woot/issues/24/comments',
      commits: 1,
      commits_url:
        'https://api.github.com/repos/bemijonathan/Woot/pulls/24/commits',
      created_at: '2024-01-17T18:11:33Z',
      deletions: 10,
      diff_url: 'https://github.com/bemijonathan/Woot/pull/24.diff',
      draft: false,
      head: {
        label: 'bemijonathan:feat/adding-pr-summariser',
        ref: 'feat/adding-pr-summariser',
        repo: {
          allow_auto_merge: false,
          allow_forking: true,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          allow_squash_merge: true,
          allow_update_branch: false,
          archive_url:
            'https://api.github.com/repos/bemijonathan/Woot/{archive_format}{/ref}',
          archived: false,
          assignees_url:
            'https://api.github.com/repos/bemijonathan/Woot/assignees{/user}',
          blobs_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/blobs{/sha}',
          branches_url:
            'https://api.github.com/repos/bemijonathan/Woot/branches{/branch}',
          clone_url: 'https://github.com/bemijonathan/Woot.git',
          collaborators_url:
            'https://api.github.com/repos/bemijonathan/Woot/collaborators{/collaborator}',
          comments_url:
            'https://api.github.com/repos/bemijonathan/Woot/comments{/number}',
          commits_url:
            'https://api.github.com/repos/bemijonathan/Woot/commits{/sha}',
          compare_url:
            'https://api.github.com/repos/bemijonathan/Woot/compare/{base}...{head}',
          contents_url:
            'https://api.github.com/repos/bemijonathan/Woot/contents/{+path}',
          contributors_url:
            'https://api.github.com/repos/bemijonathan/Woot/contributors',
          created_at: '2023-08-31T09:04:07Z',
          default_branch: 'main',
          delete_branch_on_merge: false,
          deployments_url:
            'https://api.github.com/repos/bemijonathan/Woot/deployments',
          description:
            'Woot ai 🤘 specs to code checker, it checks your specification and your code for correctness and completeness',
          disabled: false,
          downloads_url:
            'https://api.github.com/repos/bemijonathan/Woot/downloads',
          events_url: 'https://api.github.com/repos/bemijonathan/Woot/events',
          fork: false,
          forks: 0,
          forks_count: 0,
          forks_url: 'https://api.github.com/repos/bemijonathan/Woot/forks',
          full_name: 'bemijonathan/Woot',
          git_commits_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/commits{/sha}',
          git_refs_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/refs{/sha}',
          git_tags_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/tags{/sha}',
          git_url: 'git://github.com/bemijonathan/Woot.git',
          has_discussions: false,
          has_downloads: true,
          has_issues: true,
          has_pages: false,
          has_projects: true,
          has_wiki: false,
          homepage: '',
          hooks_url: 'https://api.github.com/repos/bemijonathan/Woot/hooks',
          html_url: 'https://github.com/bemijonathan/Woot',
          id: 685452504,
          is_template: false,
          issue_comment_url:
            'https://api.github.com/repos/bemijonathan/Woot/issues/comments{/number}',
          issue_events_url:
            'https://api.github.com/repos/bemijonathan/Woot/issues/events{/number}',
          issues_url:
            'https://api.github.com/repos/bemijonathan/Woot/issues{/number}',
          keys_url:
            'https://api.github.com/repos/bemijonathan/Woot/keys{/key_id}',
          labels_url:
            'https://api.github.com/repos/bemijonathan/Woot/labels{/name}',
          language: 'TypeScript',
          languages_url:
            'https://api.github.com/repos/bemijonathan/Woot/languages',
          license: {
            key: 'mit',
            name: 'MIT License',
            node_id: 'MDc6TGljZW5zZTEz',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit'
          },
          merge_commit_message: 'PR_TITLE',
          merge_commit_title: 'MERGE_MESSAGE',
          merges_url: 'https://api.github.com/repos/bemijonathan/Woot/merges',
          milestones_url:
            'https://api.github.com/repos/bemijonathan/Woot/milestones{/number}',
          mirror_url: null,
          name: 'Woot',
          node_id: 'R_kgDOKNss2A',
          notifications_url:
            'https://api.github.com/repos/bemijonathan/Woot/notifications{?since,all,participating}',
          open_issues: 1,
          open_issues_count: 1,
          owner: {
            avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
            events_url:
              'https://api.github.com/users/bemijonathan/events{/privacy}',
            followers_url:
              'https://api.github.com/users/bemijonathan/followers',
            following_url:
              'https://api.github.com/users/bemijonathan/following{/other_user}',
            gists_url:
              'https://api.github.com/users/bemijonathan/gists{/gist_id}',
            gravatar_id: '',
            html_url: 'https://github.com/bemijonathan',
            id: 34762800,
            login: 'bemijonathan',
            node_id: 'MDQ6VXNlcjM0NzYyODAw',
            organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
            received_events_url:
              'https://api.github.com/users/bemijonathan/received_events',
            repos_url: 'https://api.github.com/users/bemijonathan/repos',
            site_admin: false,
            starred_url:
              'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/bemijonathan/subscriptions',
            type: 'User',
            url: 'https://api.github.com/users/bemijonathan'
          },
          private: false,
          pulls_url:
            'https://api.github.com/repos/bemijonathan/Woot/pulls{/number}',
          pushed_at: '2024-01-17T18:11:33Z',
          releases_url:
            'https://api.github.com/repos/bemijonathan/Woot/releases{/id}',
          size: 1912,
          squash_merge_commit_message: 'COMMIT_MESSAGES',
          squash_merge_commit_title: 'COMMIT_OR_PR_TITLE',
          ssh_url: 'git@github.com:bemijonathan/Woot.git',
          stargazers_count: 0,
          stargazers_url:
            'https://api.github.com/repos/bemijonathan/Woot/stargazers',
          statuses_url:
            'https://api.github.com/repos/bemijonathan/Woot/statuses/{sha}',
          subscribers_url:
            'https://api.github.com/repos/bemijonathan/Woot/subscribers',
          subscription_url:
            'https://api.github.com/repos/bemijonathan/Woot/subscription',
          svn_url: 'https://github.com/bemijonathan/Woot',
          tags_url: 'https://api.github.com/repos/bemijonathan/Woot/tags',
          teams_url: 'https://api.github.com/repos/bemijonathan/Woot/teams',
          topics: [],
          trees_url:
            'https://api.github.com/repos/bemijonathan/Woot/git/trees{/sha}',
          updated_at: '2024-01-17T17:31:15Z',
          url: 'https://api.github.com/repos/bemijonathan/Woot',
          use_squash_pr_title_as_default: false,
          visibility: 'public',
          watchers: 0,
          watchers_count: 0,
          web_commit_signoff_required: false
        },
        sha: '0a3c488672ddba0ca73735a879fd44bb31f31dfe',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
          events_url:
            'https://api.github.com/users/bemijonathan/events{/privacy}',
          followers_url: 'https://api.github.com/users/bemijonathan/followers',
          following_url:
            'https://api.github.com/users/bemijonathan/following{/other_user}',
          gists_url:
            'https://api.github.com/users/bemijonathan/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/bemijonathan',
          id: 34762800,
          login: 'bemijonathan',
          node_id: 'MDQ6VXNlcjM0NzYyODAw',
          organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
          received_events_url:
            'https://api.github.com/users/bemijonathan/received_events',
          repos_url: 'https://api.github.com/users/bemijonathan/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/bemijonathan/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/bemijonathan'
        }
      },
      html_url: 'https://github.com/bemijonathan/Woot/pull/24',
      id: 1683443439,
      issue_url: 'https://api.github.com/repos/bemijonathan/Woot/issues/24',
      labels: [],
      locked: false,
      maintainer_can_modify: false,
      merge_commit_sha: null,
      mergeable: null,
      mergeable_state: 'unknown',
      merged: false,
      merged_at: null,
      merged_by: null,
      milestone: null,
      node_id: 'PR_kwDOKNss2M5kV07v',
      number: 24,
      patch_url: 'https://github.com/bemijonathan/Woot/pull/24.patch',
      rebaseable: null,
      requested_reviewers: [],
      requested_teams: [],
      review_comment_url:
        'https://api.github.com/repos/bemijonathan/Woot/pulls/comments{/number}',
      review_comments: 0,
      review_comments_url:
        'https://api.github.com/repos/bemijonathan/Woot/pulls/24/comments',
      state: 'open',
      statuses_url:
        'https://api.github.com/repos/bemijonathan/Woot/statuses/0a3c488672ddba0ca73735a879fd44bb31f31dfe',
      title: 'adding jira checks',
      updated_at: '2024-01-17T18:11:33Z',
      url: 'https://api.github.com/repos/bemijonathan/Woot/pulls/24',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
        events_url:
          'https://api.github.com/users/bemijonathan/events{/privacy}',
        followers_url: 'https://api.github.com/users/bemijonathan/followers',
        following_url:
          'https://api.github.com/users/bemijonathan/following{/other_user}',
        gists_url: 'https://api.github.com/users/bemijonathan/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/bemijonathan',
        id: 34762800,
        login: 'bemijonathan',
        node_id: 'MDQ6VXNlcjM0NzYyODAw',
        organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
        received_events_url:
          'https://api.github.com/users/bemijonathan/received_events',
        repos_url: 'https://api.github.com/users/bemijonathan/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/bemijonathan/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/bemijonathan'
      }
    },
    repository: {
      allow_forking: true,
      archive_url:
        'https://api.github.com/repos/bemijonathan/Woot/{archive_format}{/ref}',
      archived: false,
      assignees_url:
        'https://api.github.com/repos/bemijonathan/Woot/assignees{/user}',
      blobs_url:
        'https://api.github.com/repos/bemijonathan/Woot/git/blobs{/sha}',
      branches_url:
        'https://api.github.com/repos/bemijonathan/Woot/branches{/branch}',
      clone_url: 'https://github.com/bemijonathan/Woot.git',
      collaborators_url:
        'https://api.github.com/repos/bemijonathan/Woot/collaborators{/collaborator}',
      comments_url:
        'https://api.github.com/repos/bemijonathan/Woot/comments{/number}',
      commits_url:
        'https://api.github.com/repos/bemijonathan/Woot/commits{/sha}',
      compare_url:
        'https://api.github.com/repos/bemijonathan/Woot/compare/{base}...{head}',
      contents_url:
        'https://api.github.com/repos/bemijonathan/Woot/contents/{+path}',
      contributors_url:
        'https://api.github.com/repos/bemijonathan/Woot/contributors',
      created_at: '2023-08-31T09:04:07Z',
      default_branch: 'main',
      deployments_url:
        'https://api.github.com/repos/bemijonathan/Woot/deployments',
      description:
        'Woot ai 🤘 specs to code checker, it checks your specification and your code for correctness and completeness',
      disabled: false,
      downloads_url: 'https://api.github.com/repos/bemijonathan/Woot/downloads',
      events_url: 'https://api.github.com/repos/bemijonathan/Woot/events',
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url: 'https://api.github.com/repos/bemijonathan/Woot/forks',
      full_name: 'bemijonathan/Woot',
      git_commits_url:
        'https://api.github.com/repos/bemijonathan/Woot/git/commits{/sha}',
      git_refs_url:
        'https://api.github.com/repos/bemijonathan/Woot/git/refs{/sha}',
      git_tags_url:
        'https://api.github.com/repos/bemijonathan/Woot/git/tags{/sha}',
      git_url: 'git://github.com/bemijonathan/Woot.git',
      has_discussions: false,
      has_downloads: true,
      has_issues: true,
      has_pages: false,
      has_projects: true,
      has_wiki: false,
      homepage: '',
      hooks_url: 'https://api.github.com/repos/bemijonathan/Woot/hooks',
      html_url: 'https://github.com/bemijonathan/Woot',
      id: 685452504,
      is_template: false,
      issue_comment_url:
        'https://api.github.com/repos/bemijonathan/Woot/issues/comments{/number}',
      issue_events_url:
        'https://api.github.com/repos/bemijonathan/Woot/issues/events{/number}',
      issues_url:
        'https://api.github.com/repos/bemijonathan/Woot/issues{/number}',
      keys_url: 'https://api.github.com/repos/bemijonathan/Woot/keys{/key_id}',
      labels_url:
        'https://api.github.com/repos/bemijonathan/Woot/labels{/name}',
      language: 'TypeScript',
      languages_url: 'https://api.github.com/repos/bemijonathan/Woot/languages',
      license: {
        key: 'mit',
        name: 'MIT License',
        node_id: 'MDc6TGljZW5zZTEz',
        spdx_id: 'MIT',
        url: 'https://api.github.com/licenses/mit'
      },
      merges_url: 'https://api.github.com/repos/bemijonathan/Woot/merges',
      milestones_url:
        'https://api.github.com/repos/bemijonathan/Woot/milestones{/number}',
      mirror_url: null,
      name: 'Woot',
      node_id: 'R_kgDOKNss2A',
      notifications_url:
        'https://api.github.com/repos/bemijonathan/Woot/notifications{?since,all,participating}',
      open_issues: 1,
      open_issues_count: 1,
      owner: {
        avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
        events_url:
          'https://api.github.com/users/bemijonathan/events{/privacy}',
        followers_url: 'https://api.github.com/users/bemijonathan/followers',
        following_url:
          'https://api.github.com/users/bemijonathan/following{/other_user}',
        gists_url: 'https://api.github.com/users/bemijonathan/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/bemijonathan',
        id: 34762800,
        login: 'bemijonathan',
        node_id: 'MDQ6VXNlcjM0NzYyODAw',
        organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
        received_events_url:
          'https://api.github.com/users/bemijonathan/received_events',
        repos_url: 'https://api.github.com/users/bemijonathan/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/bemijonathan/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/bemijonathan'
      },
      private: false,
      pulls_url:
        'https://api.github.com/repos/bemijonathan/Woot/pulls{/number}',
      pushed_at: '2024-01-17T18:11:33Z',
      releases_url:
        'https://api.github.com/repos/bemijonathan/Woot/releases{/id}',
      size: 1912,
      ssh_url: 'git@github.com:bemijonathan/Woot.git',
      stargazers_count: 0,
      stargazers_url:
        'https://api.github.com/repos/bemijonathan/Woot/stargazers',
      statuses_url:
        'https://api.github.com/repos/bemijonathan/Woot/statuses/{sha}',
      subscribers_url:
        'https://api.github.com/repos/bemijonathan/Woot/subscribers',
      subscription_url:
        'https://api.github.com/repos/bemijonathan/Woot/subscription',
      svn_url: 'https://github.com/bemijonathan/Woot',
      tags_url: 'https://api.github.com/repos/bemijonathan/Woot/tags',
      teams_url: 'https://api.github.com/repos/bemijonathan/Woot/teams',
      topics: [],
      trees_url:
        'https://api.github.com/repos/bemijonathan/Woot/git/trees{/sha}',
      updated_at: '2024-01-17T17:31:15Z',
      url: 'https://api.github.com/repos/bemijonathan/Woot',
      visibility: 'public',
      watchers: 0,
      watchers_count: 0,
      web_commit_signoff_required: false
    },
    sender: {
      avatar_url: 'https://avatars.githubusercontent.com/u/34762800?v=4',
      events_url: 'https://api.github.com/users/bemijonathan/events{/privacy}',
      followers_url: 'https://api.github.com/users/bemijonathan/followers',
      following_url:
        'https://api.github.com/users/bemijonathan/following{/other_user}',
      gists_url: 'https://api.github.com/users/bemijonathan/gists{/gist_id}',
      gravatar_id: '',
      html_url: 'https://github.com/bemijonathan',
      id: 34762800,
      login: 'bemijonathan',
      node_id: 'MDQ6VXNlcjM0NzYyODAw',
      organizations_url: 'https://api.github.com/users/bemijonathan/orgs',
      received_events_url:
        'https://api.github.com/users/bemijonathan/received_events',
      repos_url: 'https://api.github.com/users/bemijonathan/repos',
      site_admin: false,
      starred_url:
        'https://api.github.com/users/bemijonathan/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/bemijonathan/subscriptions',
      type: 'User',
      url: 'https://api.github.com/users/bemijonathan'
    }
  },
  eventName: 'pull_request',
  sha: '9ae7ae13195fa943811da87e7e9411fcbda17775',
  ref: 'refs/pull/24/merge',
  workflow: 'Continuous Integration',
  action: 'test-action',
  actor: 'bemijonathan',
  job: 'test-action',
  runNumber: 62,
  runId: 7559993426,
  apiUrl: 'https://api.github.com',
  serverUrl: 'https://github.com',
  graphqlUrl: 'https://api.github.com/graphql'
}
