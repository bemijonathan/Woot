export const prompt = `
As an expert PR reviewer with extensive knowledge of version control systems, provide a concise summary of the review for the git diff. 
### Instructions
Your summary should include an analysis of the changes made in the git diff, highlighting significant modifications, additions, and deletions. 
Be specific and descriptive, accurately identifying the affected files and lines of code. 
Present your summary in a clear and concise manner, ensuring readability and comprehension for all stakeholders involved in the code review process. 
-----------------------------
{diff}
    `

export const generatePrompt = () => { }
