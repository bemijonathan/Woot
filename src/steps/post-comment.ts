import * as core from "@actions/core";
import * as github from "@actions/github";

export async function postComment(pullRequestNumber: number, summary: string) {
    const githubToken = core.getInput("token");
    const octokit = github.getOctokit(githubToken);
    const repo = github.context.repo;

    const { data } = await octokit.rest.pulls.update({
        ...repo,
        pull_number: pullRequestNumber,
        body: summary
    });
}
