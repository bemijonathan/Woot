import * as core from '@actions/core'
import * as github from '@actions/github'
import { Logger } from '../utils'
import { Ai } from '.'

const SIGNATURE = 'Added by woot! 🚂'
const getGithubContext = () => {
    const githubToken =
    core.getInput('gitHubToken') || process.env.GITHUB_ACCESS_TOKEN || ''
  const octokit = github.getOctokit(githubToken)
  const repo = github.context.repo
  return { githubToken, octokit, repo }
}

export async function postSummary(
  pullRequestNumber: number,
  summary: string,
  ai: Ai
) {
  Logger.log('posted comment', github.context)

  const { octokit, repo } = getGithubContext()
  const { data: comments } = await octokit.rest.issues.listComments({
    ...repo,
    issue_number: pullRequestNumber
  })

  const existingComment = comments.find(
    comment => comment.body?.includes(SIGNATURE)
  )
  let comment = `
  ${summary}
  ${SIGNATURE}
  `
  if (existingComment?.body) {
    Logger.log('found existing comment, updating')
    comment = `${await ai.compareOldSummaryTemplate(
      existingComment.body,
      summary
    )} ${SIGNATURE}`
  }

  postComment(comment, pullRequestNumber)
}

export const postComment = async (comment:string, pullRequestNumber:number) => {
  const { octokit, repo } = getGithubContext()
   await octokit.rest.pulls.update({
    ...repo,
    pull_number: pullRequestNumber,
    body: comment
  })
}