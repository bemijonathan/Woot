import * as core from '@actions/core'
import * as github from '@actions/github'
import { Logger } from '../utils'
import { Ai } from '../ai'
import { GitHub } from '@actions/github/lib/utils'

export class GithubClient {
  octokit: InstanceType<typeof GitHub>
  repo: { owner: string; repo: string }
  constructor() {
    const { octokit, repo } = this.getGithubContext()
    this.octokit = octokit
    this.repo = repo
  }

  getGithubContext = () => {
    const githubToken =
      core.getInput('gitHubToken') || process.env.GITHUB_ACCESS_TOKEN || ''
    const octokit = github.getOctokit(githubToken)
    const repo = github.context.repo
    return { octokit, repo, githubToken }
  }

  async getComments(pullRequestNumber: number) {
    try {
      const response = await this.octokit.rest.issues.listComments({
        ...this.repo,
        issue_number: pullRequestNumber
      })
      return response.data
    } catch (error) {
      Logger.error('error getting comments', JSON.stringify(error))
      return []
    }
  }

  async postComment(comment: string, pullRequestNumber: number) {
    try {
      await this.octokit.rest.pulls.update({
        ...this.repo,
        pull_number: pullRequestNumber,
        body: comment
      })
    } catch (error) {
      Logger.error('error posting comment', JSON.stringify(error))
    }
  }
}
