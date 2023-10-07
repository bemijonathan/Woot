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

    const openAiKey = core.getInput('openAIKey')

    Logger.log('creating openai model', openAiKey.length ? 'with key' : 'without key')

    const model = new OpenAI(
      { temperature: 0.7, openAIApiKey: openAiKey, "model": "davinci" },
    )

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 0,
      keepSeparator: true,
      chunkSize: 5000
    })

    Logger.log('created text splitter')

    const docs = await textSplitter.createDocuments([diff])

    const basePromptTemplate = new PromptTemplate({
      template: prompt,
      inputVariables: ["diff"]
    })

    Logger.log('created prompt template')

    const chain = loadSummarizationChain(model, {
      type: "refine",
      verbose: true,
      refinePrompt: basePromptTemplate
    })

    Logger.log('loaded summarization chain')

    const res = await chain.call({
      input_documents: docs,
      diff: diff
    })

    Logger.log('summarized changes')
    console.log({ res })
    return res.output_text
  } catch (e) {
    Logger.log('error summarizing changes')
    console.log(e)
    Logger.log(e)
  }
}
