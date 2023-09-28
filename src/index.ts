import * as core from '@actions/core'
import * as github from "@actions/github";
import { getChanges, postComment, summarizeChanges } from './steps';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Extract the PR number from the GitHub context
    const pullRequestNumber = github.context.payload.pull_request?.number;

    // If the PR number is not found, exit the action
    if (!pullRequestNumber) {
      core.warning("Could not get pull request number from context, exiting");
      return;
    }

    // Get the changes in the PR
    const changes = await getChanges(pullRequestNumber);

    // Summarize the changes
    const summary = summarizeChanges(changes);

    // Post the summary as a comment
    await postComment(pullRequestNumber, summary);
  } catch (error) {
    // Set the action as failed if there is an error
    core.setFailed((error as Error)?.message as string);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run().catch(error => core.setFailed("Workflow failed! " + error.message));
