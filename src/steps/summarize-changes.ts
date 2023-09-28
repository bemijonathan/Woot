

const prompt = `
Summarize the diff changes in the  file for the Pull Request:


Additionally, please provide an assessment of the overall value of the feature or bug addressed by these changes. Is it considered a significant improvement or bug fix? Please explain your reasoning.
`

interface FileInfo {
    name: string;
    changes: string[];
}

export function summarizeChanges(files: any[]) {

    const groupedFiles: Map<number, FileInfo[]> = new Map();

    for (const file of files) {
        const changeCount = file.changes.length;

        if (!groupedFiles.has(changeCount)) {
            groupedFiles.set(changeCount, []);
        }

        groupedFiles.get(changeCount)!.push(file);
    }

    for (const [changeCount, files] of groupedFiles) {
        console.log(`Grouping files by change count: ${changeCount}`);
        for (const file of files) {
            console.log(` - ${file.name}`);
        }
    }


    let summary = '## Summary of Changes\n\n';

    for (const file of files) {
        summary += `- ${file.filename}: ${file.status}, ${file.changes} changes\n`;
    }

    return summary;
}



function groupFilesByChangeCount(files: FileInfo[]): void {
    const sortedFiles = files.slice().sort((a, b) => {
        // Sort files by their change count in descending order
        return b.changes.length - a.changes.length;
    });

    let currentGroup: FileInfo[] = [];
    let previousGroupSize = 0;

    for (const file of sortedFiles) {
        const fileChanges = file.changes.length;

        // If the current file's change count is greater than the previous group size, start a new group
        if (fileChanges > previousGroupSize) {
            currentGroup = [];
            previousGroupSize = fileChanges;
        }

        currentGroup.push(file);
    }

    // Log the grouped files
    for (const group of currentGroup) {
        console.log(`Grouping files by change count: ${previousGroupSize}`);
        for (const file of group) {
            console.log(` - ${file.name}`);
        }
    }
}