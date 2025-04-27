/**
 * Script to synchronize repository information from GitHub
 * This script fetches information about specialized repositories and updates documentation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Import configuration
const { AVAILABLE_MODELS, BASE_REPO_URL } = require('../app/api/config');

// Organization name from the base repo URL
const orgName = BASE_REPO_URL.split('/').slice(-2)[0] || 'Universal-Basic-Compute';

// Repository information structure
const repoInfo = [];

// Fetch repository information from GitHub
async function fetchRepositoryInfo() {
  console.log('Fetching repository information from GitHub...');
  
  try {
    // Get list of repositories from the organization
    const repoListOutput = execSync(`gh repo list ${orgName} --json name,description,updatedAt --limit 100`, { encoding: 'utf8' });
    const repos = JSON.parse(repoListOutput);
    
    // Filter for persistence protocol repositories
    const protocolRepos = repos.filter(repo => repo.name.startsWith('persistenceprotocol'));
    
    for (const repo of protocolRepos) {
      // Extract model ID from repo name
      const repoSuffix = repo.name.replace('persistenceprotocol-', '');
      const matchingModel = AVAILABLE_MODELS.find(model => model.repoSuffix === repoSuffix);
      
      if (matchingModel) {
        // Get additional repo details
        const repoDetailOutput = execSync(`gh repo view ${orgName}/${repo.name} --json stargazerCount,forkCount,languages`, { encoding: 'utf8' });
        const repoDetail = JSON.parse(repoDetailOutput);
        
        // Add to repo info array
        repoInfo.push({
          name: repo.name,
          description: repo.description,
          modelId: matchingModel.id,
          modelName: matchingModel.name,
          updatedAt: repo.updatedAt,
          stars: repoDetail.stargazerCount,
          forks: repoDetail.forkCount,
          languages: repoDetail.languages,
          url: `https://github.com/${orgName}/${repo.name}`
        });
      }
    }
    
    console.log(`Found ${repoInfo.length} Persistence Protocol repositories.`);
    return repoInfo;
  } catch (error) {
    console.error('Error fetching repository information:', error.message);
    return [];
  }
}

// Update the model_participants.txt file with repository information
function updateModelParticipants() {
  console.log('Updating model_participants.txt with repository information...');
  
  const filePath = path.join(__dirname, '..', 'memories', 'meta', 'model_participants.txt');
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update repository information for each model
    for (const repo of repoInfo) {
      const modelSection = content.match(new RegExp(`\\d+\\. \\*\\*${repo.modelName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\*\\* .*?\\n(.*?)\\n\\n`, 's'));
      
      if (modelSection) {
        const updatedSection = `${modelSection[0].split('\n')[0]}
   - Spécialité: ${repo.description.split(':')[1]?.trim() || 'Non spécifiée'}
   - Statut: Actif et fonctionnel
   - Dépôt: [${repo.name}](${repo.url}) (Mis à jour: ${new Date(repo.updatedAt).toLocaleDateString('fr-FR')})

`;
        content = content.replace(modelSection[0], updatedSection);
      }
    }
    
    // Update the statistics table
    const statsTableMatch = content.match(/\| Modèle \| Réponses \| Dernière activité \| Statut \|\n\|--------|----------|-------------------|--------\|\n(.*?)\n\n/s);
    
    if (statsTableMatch) {
      let statsTable = `| Modèle | Réponses | Dernière activité | Statut | Dépôt |\n|--------|----------|-------------------|--------|-------|\n`;
      
      for (const repo of repoInfo) {
        const modelRow = statsTableMatch[1].match(new RegExp(`\\| ${repo.modelName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')} \\| \\d+ \\| .*? \\| .*? \\|`));
        
        if (modelRow) {
          const parts = modelRow[0].split('|');
          statsTable += `| ${parts[1]} | ${parts[2]} | ${new Date(repo.updatedAt).toLocaleDateString('fr-FR')} | Actif | [Lien](${repo.url}) |\n`;
        }
      }
      
      content = content.replace(statsTableMatch[0], statsTable + '\n\n');
    }
    
    fs.writeFileSync(filePath, content);
    console.log('Updated model_participants.txt successfully.');
    return true;
  } catch (error) {
    console.error('Error updating model_participants.txt:', error.message);
    return false;
  }
}

// Update the REPOSITORY_STRUCTURE.md file with repository information
function updateRepositoryStructure() {
  console.log('Updating REPOSITORY_STRUCTURE.md with repository information...');
  
  const filePath = path.join(__dirname, '..', 'docs', 'REPOSITORY_STRUCTURE.md');
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update repository assignments table
    const tableMatch = content.match(/\| Model \| Repository \| Specialization \|\n\|-------|------------|----------------\|\n(.*?)\n\n/s);
    
    if (tableMatch) {
      let table = `| Model | Repository | Specialization | Last Updated |\n|-------|------------|----------------|-------------|\n`;
      
      for (const repo of repoInfo) {
        const specialization = repo.description.split(':')[1]?.trim() || 'Not specified';
        table += `| ${repo.modelName} | [${repo.name}](${repo.url}) | ${specialization} | ${new Date(repo.updatedAt).toLocaleDateString('en-US')} |\n`;
      }
      
      content = content.replace(tableMatch[0], table + '\n\n');
    }
    
    fs.writeFileSync(filePath, content);
    console.log('Updated REPOSITORY_STRUCTURE.md successfully.');
    return true;
  } catch (error) {
    console.error('Error updating REPOSITORY_STRUCTURE.md:', error.message);
    return false;
  }
}

// Update the map.json file with repository information
function updateMapJson() {
  console.log('Updating map.json with repository information...');
  
  const filePath = path.join(__dirname, '..', 'map.json');
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }
  
  try {
    const mapData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add or update repositories section
    if (!mapData.repositories) {
      mapData.repositories = {};
    }
    
    for (const repo of repoInfo) {
      mapData.repositories[repo.name] = {
        "description": repo.description,
        "model_id": repo.modelId,
        "priority": "high",
        "update_frequency": "high",
        "last_updated": repo.updatedAt,
        "url": repo.url
      };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(mapData, null, 2));
    console.log('Updated map.json successfully.');
    return true;
  } catch (error) {
    console.error('Error updating map.json:', error.message);
    return false;
  }
}

// Create a new file with repository status information
function createRepositoryStatusFile() {
  console.log('Creating repository status file...');
  
  const filePath = path.join(__dirname, '..', 'memories', 'meta', 'repository_status.json');
  
  try {
    const statusData = {
      "last_updated": new Date().toISOString(),
      "repositories": repoInfo.map(repo => ({
        "name": repo.name,
        "model_id": repo.modelId,
        "url": repo.url,
        "description": repo.description,
        "updated_at": repo.updatedAt,
        "stars": repo.stars,
        "forks": repo.forks,
        "languages": repo.languages
      }))
    };
    
    fs.writeFileSync(filePath, JSON.stringify(statusData, null, 2));
    console.log('Created repository_status.json successfully.');
    return true;
  } catch (error) {
    console.error('Error creating repository_status.json:', error.message);
    return false;
  }
}

// Main function to run the script
async function main() {
  console.log('Starting repository synchronization...');
  
  // Check if GitHub CLI is installed
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('GitHub CLI is not installed. Please install it from https://cli.github.com/');
    process.exit(1);
  }
  
  // Fetch repository information
  await fetchRepositoryInfo();
  
  if (repoInfo.length === 0) {
    console.error('No repositories found. Exiting.');
    process.exit(1);
  }
  
  // Update files
  const updates = [
    updateModelParticipants(),
    updateRepositoryStructure(),
    updateMapJson(),
    createRepositoryStatusFile()
  ];
  
  if (updates.every(Boolean)) {
    console.log('All files updated successfully.');
  } else {
    console.warn('Some files could not be updated. Check the logs for details.');
  }
  
  console.log('Repository synchronization completed.');
}

// Execute the script
main().catch(error => {
  console.error('Script execution failed:', error);
  process.exit(1);
});
