import { OpenAI } from 'langchain/llms/openai'
import { loadSummarizationChain } from 'langchain/chains'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { PromptTemplate } from 'langchain/prompts'
import { prompt } from 'src/prompts.js'
import { Logger } from 'src/utils.js'

export async function summarizeChanges(
  diff: string
): Promise<string | undefined> {
  try {
    Logger.log('summarizing changes')
    const model = new OpenAI({ temperature: 0 })
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
