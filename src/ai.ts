import {
  prompt,
  jiraPrompt,
  acSummariesPrompt,
  compareOldSummaryTemplate
} from './constants.js'
import * as core from '@actions/core'
import OpenAI from 'openai'
import { Logger } from './utils.js'

export class Ai {
  constructor() {
    const openAiKey = core.getInput('openAIKey') || process.env.OPENAI_API_KEY
    if (!openAiKey) {
      throw new Error('OpenAI key is required')
    }
    this.model = new OpenAI({
      apiKey: openAiKey
    })
  }
  configuration = {
    model: 'gpt-3.5-turbo'
  }
  model: OpenAI
  basePromptTemplate = prompt
  jiraPromptTemplate = jiraPrompt
  acSummariesPromptTemplate = acSummariesPrompt
  compareOldSummaryTemplate(oldSummary: string, newSummary: string): string {
    return compareOldSummaryTemplate(oldSummary, newSummary)
  }
  execute = async (prompt: string) => {
    try {
      const response = await this.model.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        ...this.configuration
      })
      Logger.log('ai response', { response })
      return response.choices[0].message.content
    } catch (e) {
      Logger.error('error summarizing changes', e)
      return null
    }
  }
}
