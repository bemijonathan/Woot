function summarizeChanges(files: any[]) {
    let summary = '## Summary of Changes\n\n';

    for (const file of files) {
        summary += `- ${file.filename}: ${file.status}, ${file.changes} changes\n`;
    }

    return summary;
}