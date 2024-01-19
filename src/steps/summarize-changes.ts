import { OpenAI } from '@langchain/openai'
const { loadSummarizationChain } = require('langchain/chains')
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
import { PromptTemplate } from '@langchain/core/prompts'
import { prompt, jiraPrompt, acSummariesPrompt } from '../prompts.js'
import { Logger } from '../utils.js'
import * as core from '@actions/core'
import { Issue } from "jira.js/out/agile/models"



export class Ai {
  constructor() {
     const openAiKey = core.getInput('openAIKey') || process.env.OPENAI_API_KEY || ''
     this.model = new OpenAI({
      temperature: 0.1,
      openAIApiKey: openAiKey,
    })
  }
  model: OpenAI
  basePromptTemplate = new PromptTemplate({
    template: prompt,
    inputVariables: ['diff']
  })
  jiraPromptTemplate = new PromptTemplate({
    template: jiraPrompt,
    inputVariables: ['ticketDescription']
  })
}


export class SummariseChanges {
  static textSplitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 0,
    keepSeparator: true,
    chunkSize: 5000
  })
  static async summarizeGitChanges(
    diff: string,
    ai: Ai,
  ): Promise<string | undefined> {
    try {
      const docs = await this.textSplitter.createDocuments([diff])
      const chain = loadSummarizationChain(ai.model, {
        type: 'refine',
        verbose: true,
        refinePrompt: ai.basePromptTemplate
      })  
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

  static async summariseJiraTickets(issues: Issue[], ai: Ai){
    const issueMapLongDesc = issues.map((issue) => {
      return issue.fields?.description ?? ''
    }).join('\n')
    try {
      const docs = await this.textSplitter.createDocuments([issueMapLongDesc])
      Logger.log('created prompt template')
      const chain = loadSummarizationChain(ai.model, {
        type: 'refine',
        verbose: true,
        refinePrompt: ai.jiraPromptTemplate
      })  
      Logger.log('loaded summarization chain')
      const res = await chain.call({
        input_documents: docs,
        diff: issueMapLongDesc
      })
      Logger.log('summarized jira tickets', { res })
      return res.output_text
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }

  static checkedCodeReviewAgainstCriteria = async (gitSummary :string, jiraSummary:string, ai:Ai) => {
    try {
      // decided to use a custom prompt for this
      const response = await ai.model.invoke(
        `
        ${acSummariesPrompt}
        ------------------ git diff ------------------
        ${gitSummary}
        ------------------ jira tickets ------------------
        ${jiraSummary}
        `
      )
      console.log(response)
      return response
    } catch (e) {
      Logger.error('error summarizing changes', e)
    }
  }
}
