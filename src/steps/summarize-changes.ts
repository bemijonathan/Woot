const { OpenAI } = require('langchain/llms/openai')
const { loadSummarizationChain } = require('langchain/chains')
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
const { PromptTemplate } = require('langchain/prompts')
import { prompt } from 'src/prompts.js'
import { Logger } from 'src/utils.js'
import * as core from '@actions/core'

export async function summarizeChanges(
  diff: string
): Promise<string | undefined> {
  try {
    Logger.log('summarizing changes')
    const openAiKey = core.getInput('openAIKey')
    const model = new OpenAI(
      { temperature: 0 },
      { apiKey: openAiKey }
    )
    Logger.log('created model')
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      separators: ['diff --git'],
      chunkOverlap: 0,
      keepSeparator: true
    })
    Logger.log('created text splitter')
    const docs = await textSplitter.createDocuments([diff])
    const basePromptTemplate = PromptTemplate.fromTemplate(prompt)
    Logger.log('created prompt template')
    const chain = loadSummarizationChain(model, {
      prompt: basePromptTemplate,
      verbose: true,
      type: 'stuff'
    })
    Logger.log('loaded summarization chain')
    const res = await chain.call({
      input_documents: docs
    })
    Logger.log('summarized changes')
    console.log({ res })

    return res.output.join('\n')
  } catch (e) {
    Logger.log('error summarizing changes')
    Logger.error(JSON.stringify(e as unknown as string))
  }
}
