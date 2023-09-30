import * as core from '@actions/core'
import * as github from '@actions/github'
import { Logger } from 'src/utils.js'

export async function postComment(pullRequestNumber: number, summary: string) {
  const githubToken = core.getInput('token')
  const octokit = github.getOctokit(githubToken)
  const repo = github.context.repo
  Logger.log('posted comment', github.context)

  const { data } = await octokit.rest.pulls.update({
    ...repo,
    pull_number: pullRequestNumber,
    body: summary
  })
  Logger.log('posted comment', data.body)
}
