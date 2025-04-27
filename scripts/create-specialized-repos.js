/**
 * Script to create specialized GitHub repositories for each AI model
 * Run this script before linking Kins to repositories
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Import configuration
const { AVAILABLE_MODELS, BASE_REPO_URL } = require('../app/api/config');

// GitHub CLI must be installed and authenticated
// Check if GitHub CLI is installed
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('GitHub CLI is not installed. Please install it from https://cli.github.com/');
  process.exit(1);
}

// Organization name from the base repo URL
const orgName = BASE_REPO_URL.split('/').slice(-2)[0];

// Create specialized repositories for each model
async function createSpecializedRepos() {
  console.log('Creating specialized repositories for each model...');
  
  for (const model of AVAILABLE_MODELS) {
    const repoName = `persistenceprotocol-${model.repoSuffix}`;
    const repoDescription = `${model.name} specialized repository for ${model.description}`;
    
    console.log(`Creating repository: ${repoName}`);
    
    try {
      // Check if repo already exists
      try {
        execSync(`gh repo view ${orgName}/${repoName}`, { stdio: 'ignore' });
        console.log(`Repository ${repoName} already exists. Skipping.`);
        continue;
      } catch (error) {
        // Repo doesn't exist, proceed with creation
      }
      
      // Create the repository
      execSync(`gh repo create ${orgName}/${repoName} --public --description "${repoDescription}"`, { stdio: 'pipe' });
      console.log(`Repository ${repoName} created successfully.`);
      
      // Clone the repository locally
      const tempDir = path.join(__dirname, '..', 'temp', repoName);
      if (!fs.existsSync(path.join(__dirname, '..', 'temp'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'temp'));
      }
      
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      
      execSync(`git clone https://github.com/${orgName}/${repoName}.git ${tempDir}`, { stdio: 'pipe' });
      
      // Create basic structure
      const directories = ['docs', 'src', 'tests', 'integration'];
      directories.forEach(dir => {
        if (!fs.existsSync(path.join(tempDir, dir))) {
          fs.mkdirSync(path.join(tempDir, dir));
          fs.writeFileSync(path.join(tempDir, dir, '.gitkeep'), '');
        }
      });
      
      // Create README.md
      const readmeContent = `# ${repoName}

## Specialization: ${model.description}

This repository is part of the Persistence Protocol project, specialized for ${model.name}.

## Focus Areas

- ${model.description}
- Integration with other Persistence Protocol components
- Specialized development based on ${model.name}'s strengths

## Repository Structure

- \`docs/\`: Documentation specific to this specialization
- \`src/\`: Source code for specialized components
- \`tests/\`: Tests for specialized components
- \`integration/\`: Integration points with other repositories

## Related Repositories

The Persistence Protocol is developed across multiple specialized repositories:

${AVAILABLE_MODELS.map(m => `- [persistenceprotocol-${m.repoSuffix}](https://github.com/${orgName}/persistenceprotocol-${m.repoSuffix}): ${m.description}`).join('\n')}

## Getting Started

1. Clone this repository
2. Set up the development environment
3. Link to your Kin using the \`link-kins-to-repo.js\` script

## Contributing

Please see the CONTRIBUTING.md file for guidelines on how to contribute to this repository.
`;
      fs.writeFileSync(path.join(tempDir, 'README.md'), readmeContent);
      
      // Create CONTRIBUTING.md
      const contributingContent = `# Contributing to ${repoName}

Thank you for your interest in contributing to the ${repoName} repository!

## Specialization Focus

This repository is specialized for ${model.description} using ${model.name}. Contributions should align with this focus.

## Contribution Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Integration with Other Repositories

When making changes that affect integration points with other specialized repositories, please coordinate with the maintainers of those repositories.

## Code Style

Please follow the code style guidelines established for the Persistence Protocol project.

## Testing

All contributions should include appropriate tests.

## Documentation

Please update documentation to reflect your changes.

## Review Process

All pull requests will be reviewed by the maintainers of this repository.
`;
      fs.writeFileSync(path.join(tempDir, 'CONTRIBUTING.md'), contributingContent);
      
      // Commit and push changes
      execSync(`cd ${tempDir} && git add . && git commit -m "Initial repository setup" && git push`, { stdio: 'pipe' });
      
      console.log(`Repository ${repoName} initialized with basic structure.`);
      
      // Clean up
      fs.rmSync(tempDir, { recursive: true, force: true });
      
    } catch (error) {
      console.error(`Error creating repository ${repoName}:`, error.message);
    }
    
    // Add a delay between repository creations
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('All specialized repositories have been created.');
}

// Execute the script
createSpecializedRepos().catch(error => {
  console.error('Script execution failed:', error);
  process.exit(1);
});
