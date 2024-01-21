import OpenAI from 'openai'
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
import { prompt, jiraPrompt, acSummariesPrompt } from '../prompts.js'
import { Logger } from '../utils.js'
import * as core from '@actions/core'
import { Issue } from 'jira.js/out/agile/models'


export class Ai {
  constructor() {
    const openAiKey =
      core.getInput('openAIKey') || process.env.OPENAI_API_KEY || ''
    this.model = new OpenAI({
      apiKey: openAiKey,
      
    })
  }
  configuration = {
    model: 'gpt-3.5-turbo',
  }
  model: OpenAI
  basePromptTemplate = prompt
  jiraPromptTemplate = jiraPrompt
  acSummariesPromptTemplate = acSummariesPrompt
}

export class SummariseChanges {
  static textSplitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 0,
    keepSeparator: true,
    chunkSize: 5000
  })
  static async summarizeGitChanges(
    diff: string,
    ai: Ai
  ): Promise<string | null> {
    try {
      // lovely approach but takes too long since we can have 30 - 50
      // documents and cannot wait the entire time
      // const docs = await this.textSplitter.createDocuments([diff])
      const response = await ai.model.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `${ai.basePromptTemplate} 
            diff: ${diff}`
          }
        ],
        ...ai.configuration
      })
      Logger.log('summarized changes', { response })
      return response.choices[0].message.content
    } catch (e) {
      Logger.error('error summarizing changes', e)
      return null
    }
  }

  static async summariseJiraTickets(issues: Issue[], ai: Ai) {
    const issueMapLongDesc = issues.join('\n')
    try {
      // const docs = await this.textSplitter.createDocuments([issueMapLongDesc])
      const response = await ai.model.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `${ai.jiraPromptTemplate}
              _____________________________
              ${issueMapLongDesc}`
          }
        ],
        ...ai.configuration
      })
      Logger.log('summarized jira tickets', { response })
      return response.choices[0].message.content
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }

  static checkedCodeReviewAgainstCriteria = async (
    gitSummary: string,
    jiraSummary: string,
    ai: Ai
  ) => {
    try {
      // decided to use a custom prompt for this
      const response = await ai.model.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `
              ${ai.acSummariesPromptTemplate}
              ------------------ git diff summary ------------------
              ${gitSummary}
              ------------------ jira tickets summary ------------------
              ${jiraSummary}
              `
          }
        ],
        ...ai.configuration
      })
      console.log(response)
      return response.choices[0].message.content
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }
}
