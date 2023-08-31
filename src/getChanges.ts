import * as core from "@actions/core";
import * as github from "@actions/github";

async function getChanges(pullRequestNumber: number) {
    const githubToken = core.getInput("token");
    const octokit = github.getOctokit(githubToken);
    const repo = github.context.repo;

    const { data: files } = await octokit.pulls.listFiles({
        ...repo,
        pull_number: pullRequestNumber,
    });

    return files;
}