import { Ai } from '../ai.js';
import { Logger } from '../utils.js'
import { Issue } from 'jira.js/out/agile/models'

export class SummarizeChanges {
  static async summarizeGitChanges(
    diff: string,
    ai: Ai
  ): Promise<string | null> {
    Logger.log('fetching summarized changes');
    return ai.execute(`${ai.basePromptTemplate} \n diff: ${diff}`)
  }

  static async summarizeJiraTickets(issues: Issue[], ai: Ai): Promise<string | null> {
    const issueMapLongDesc = issues.join('\n')
    Logger.log('summarizing jira tickets',)
    return ai.execute(`${ai.jiraPromptTemplate} \n _____________________________ \n ${issueMapLongDesc}`)
  }

  static checkedCodeReviewAgainstCriteria = async (
    gitSummary: string,
    jiraSummary: string,
    ai: Ai
  ): Promise<string | null> => {
    Logger.log('checking code review against criteria')
    return ai.execute(`${ai.acSummariesPromptTemplate} \n ------------------ git diff summary ------------------ \n ${gitSummary} \n ------------------ jira tickets summary ------------------ \n ${jiraSummary}`);
  }
}
