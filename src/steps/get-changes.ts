import * as core from '@actions/core'
import * as github from '@actions/github'
import { Logger } from 'src/utils.js'

export async function getChanges(
  pullRequestNumber: number
): Promise<string | undefined> {
  try {
    Logger.log('getting changes', pullRequestNumber)
    const githubToken = core.getInput('gitHubToken')
    const octokit = github.getOctokit(githubToken)
    const repo = github.context.repo

    const { data: files } = await octokit.rest.pulls.get({
      ...repo,
      pull_number: pullRequestNumber,
      mediaType: {
        format: 'diff'
      }
    })

    Logger.log('got changes diff', files)

    return files as unknown as string
  } catch (error) {
    Logger.error('error getting changes', JSON.stringify(error))
  }
}
