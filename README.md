<h2 align="center">🌟 Woot!! 🌟</h2>
<p align="center">
    <em>AI-Powered PR Acceptance Criteria Checker 🤖</em>
</p>

<h3>📖 Description</h3>
<p>
    Woot!! is an innovative AI tool 🛠️ designed to streamline PR reviews by ensuring alignment with acceptance criteria. It's perfect for developers, project maintainers, and teams looking for efficient and accurate PR evaluations.
</p>

<h3>🚀 Key Features</h3>
<ul>
    <li><strong>Automatic Summarization:</strong> 📝 Uses NLP to extract main points from PR descriptions.</li>
    <li><strong>Key Changes Highlight:</strong> 🔍 Identifies significant code changes for focused reviews.</li>
</ul>

<h3>🛠️ Setup and Installation</h3>
<p>
    Follow these steps to get Woot!! up and running in your project:
    <ol>
        <li>Create a <code>.yml</code> file in <code>.github/workflows</code>.</li>
        <li>Add the Woot!! action to your workflow.</li>
        <li>Configure your GitHub Token, OpenAI Key, and other necessary details.</li>
    </ol>
</p>

<h3>💡 How to Use</h3>
<p>
    Integrate Woot!! into your GitHub Actions workflow for automated PR checks. Here's an example configuration:
    
   ```sh
-  name: Run Woot!!
      uses: bemijonathan/woot@v1
      with:
         githubToken: ${{ secrets.GITHUB_TOKEN }}
         openAIKey: ${{ secrets.OPEN_AI_KEY }}
         jiraEmail: ${{ secrets.JIRA_EMAIL }}
         jiraApiKey: ${{ secrets.JIRA_API_KEY }}
         jiraHost: ${{ secrets.JIRA_HOST }}
```
</p>

<h3>🤝 Contributing</h3>
<p>
    Contributions are welcome! 🙌 Check out our contributing guidelines for more information.
</p>

<h3>📜 License</h3>
<p>
    This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.
</p>

<h3>📞 Support</h3>
<p>
    Need help? Contact us at <a href="mailto:support@woot.com">support@woot.com</a>.
</p>
