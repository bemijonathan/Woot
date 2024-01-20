export const prompt = `
As an expert PR reviewer with extensive knowledge of version control systems, provide a concise summary of the review for the git diff. 
### Instructions
Your summary should include an analysis of the changes made in the git diff, highlighting significant modifications, additions, and deletions. 
Be specific and descriptive, accurately identifying the affected files and lines of code. 
Present your summary in a clear and concise manner, ensuring readability and comprehension for all stakeholders involved in the code review process. 
-----------------------------
`

export const jiraPrompt = `
you are given a jira ticket that contains the acceptance criteria for the task you are reviewing 
the aim is to collect all possible information from the jira ticket 
and create a list of summary of all the acceptance criteria and and todos from from the description

Jira Ticket description
______________________________________
`

export const acSummariesPrompt = `
Your job is to use the summary of the code changes and the summary of a jira ticket 
ticket and create a readme checklist of the acceptance criteria from the summary of the jira ticket
you will then compare the code changes to the acceptance criteria 
if the code changes meet the acceptance criteria you will check the box 

you will use this format example: 

### Task: move all business logic to the services folder  

- [ ] add a new column called status
- [ ] add a new validated dropdown column to chenge the status
- [ ] implement the correct logic to change the status

if all the criteria is met you will check the box

- [x] add a new column called status
- [x] add a new validated dropdown column to chenge the status and the unmet criteria will be left unchecked
- [ ] implement the correct logic to change the status
`
