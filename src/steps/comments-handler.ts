import * as core from '@actions/core'
import * as github from '@actions/github'
import { Logger } from '../utils'
import { Ai } from '../ai'
import { GitHub } from '@actions/github/lib/utils'
import { GithubClient } from '../clients'

export class CommentHandler {
  constructor(private readonly repoClient: GithubClient) {}
  SIGNATURE = 'Added by woot! 🚂'
  async postSummary(pullRequestNumber: number, summary: string, ai: Ai) {
    Logger.log('posted comment', github.context)
    const comments = await this.repoClient.getComments(pullRequestNumber)
    const existingComment = comments.find(
      comment => comment.body?.includes(this.SIGNATURE)
    )
    let comment = `${summary} \n ${this.SIGNATURE}`
    if (existingComment?.body) {
      Logger.log('found existing comment, updating')
      comment = `${await ai.compareOldSummaryTemplate(
        existingComment.body,
        summary
      )} \n ${this.SIGNATURE}`
    }
    await this.postComment(comment, pullRequestNumber)
  }

  postComment = async (comment: string, pullRequestNumber: number) => {
    return this.repoClient.postComment(comment, pullRequestNumber)
  }
}
