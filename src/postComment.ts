async function postComment(pullRequestNumber: number, summary: string) {
    const githubToken = core.getInput("token");
    const octokit = github.getOctokit(githubToken);
    const repo = github.context.repo;

    const { data: comments } = await octokit.issues.listComments({
        ...repo,
        issue_number: pullRequestNumber,
    });

    const comment = comments.find((comment) => {
        return (
            comment.user.login === "github-actions[bot]" &&
            comment.body.startsWith("## Summary of Changes\n")
        );
    });

    if (comment) {
        await octokit.issues.updateComment({
            ...repo,
            comment_id: comment.id,
            body: summary
        });
    } else {
        await octokit.issues.createComment({
            ...repo,
            issue_number: pullRequestNumber,
            body: summary
        });
    }
}
