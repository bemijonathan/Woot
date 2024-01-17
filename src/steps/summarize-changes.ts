const { OpenAI } = require('langchain/llms/openai')
const { loadSummarizationChain } = require('langchain/chains')
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
const { PromptTemplate } = require('langchain/prompts')
import { prompt } from 'src/prompts.js'
import { Logger } from 'src/utils.js'
import * as core from '@actions/core'
import { Issue } from "jira.js/out/agile/models"


const openAiKey = core.getInput('openAIKey')
const model = new OpenAI({
  temperature: 0.1,
  openAIApiKey: openAiKey,
  model: 'davinci'
})
Logger.log(
  'creating openai model',
  openAiKey.length ? 'with key' : 'without key'
)
const basePromptTemplate = new PromptTemplate({
  template: prompt,
  inputVariables: ['diff']
})

export class SummariseChanges {
  static textSplitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 0,
    keepSeparator: true,
    chunkSize: 5000
  })
  static createPromptTemplate =  (prompt: string) => {
    return loadSummarizationChain(model, {
      type: 'refine',
      verbose: true,
      refinePrompt: prompt
    })
  }
  static async summarizeGitChanges(
    diff: string
  ): Promise<string | undefined> {
    try {
      const docs = await this.textSplitter.createDocuments([diff])
      Logger.log('created prompt template')
      const chain = this.createPromptTemplate(basePromptTemplate)
      Logger.log('loaded summarization chain')
      const res = await chain.call({
        input_documents: docs,
        diff: diff
      })
      Logger.log('summarized changes', { res })
      return res.output_text
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }

  static async summariseJiraTickets(issues: Issue[]){
    const issuemapLongDesc = issues.map((issue) => {
      return issue.fields?.description ?? ''
    }).join('\n')
    try {
      const docs = await this.textSplitter.createDocuments([issuemapLongDesc])
      Logger.log('created prompt template')
      const chain = this.createPromptTemplate(basePromptTemplate)
      Logger.log('loaded summarization chain')
      const res = await chain.call({
        input_documents: docs,
        diff: issuemapLongDesc
      })
      Logger.log('summarized jira tickets', { res })
      return res.output_text
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }

  static checkedCodeReviewAgainstCriteria = async (gitSummary :string, jiraSummary:string) => {
    try {
      // decided to use a custom prompt for this
      // model.
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }
}