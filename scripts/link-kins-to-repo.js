const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/v2'; // Use localhost for development
const BLUEPRINT_ID = 'persistenceprotocol';
const GITHUB_REPO_URL = 'https://github.com/Universal-Basic-Compute/persistenceprotocol';

// Import the models from config
let AVAILABLE_MODELS;
try {
  const config = require('../app/api/config');
  AVAILABLE_MODELS = config.AVAILABLE_MODELS;
} catch (error) {
  console.warn('Config file not found, using default values');
  // Fallback to default models if config is not available
  AVAILABLE_MODELS = [
    { id: 'claude-3-7-sonnet-latest', preferredPlatform: 'vercel' },
    { id: 'deepseek-chat', preferredPlatform: 'render' },
    { id: 'o4-mini', preferredPlatform: 'vercel' },
    { id: 'gpt-4-1', preferredPlatform: 'vercel' },
    { id: 'gpt-4o', preferredPlatform: 'vercel' }
  ];
}

// Extract model IDs
const MODELS = AVAILABLE_MODELS.map(model => model.id);

/**
 * Link a kin to a GitHub repository
 * @param {string} kinId - The kin ID
 * @param {Object} options - Additional options
 * @param {string} options.githubUrl - The GitHub repository URL
 * @param {string} options.deploymentPlatform - The deployment platform ('vercel' or 'render')
 * @param {number} retryCount - The number of retries
 */
async function linkKinToRepo(kinId, options = {}, retryCount = 0) {
  const model = AVAILABLE_MODELS.find(m => m.id === kinId) || {};
  const { 
    githubUrl = GITHUB_REPO_URL,
    deploymentPlatform = model.preferredPlatform || 'vercel'
  } = options;
  
  try {
    console.log(`Linking kin ${kinId} to GitHub repository (${deploymentPlatform})... (Attempt ${retryCount + 1})`);
    
    const response = await fetch(
      `${API_BASE_URL}/blueprints/${BLUEPRINT_ID}/kins/${kinId}/link-repo`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          github_url: githubUrl,
          metadata: {
            deploymentPlatform
          }
          // Note: token and username are optional and will use environment variables if available
        }),
      }
    );
    
    // Get the response as text first
    const responseText = await response.text();
    
    // Try to parse as JSON, but handle non-JSON responses
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { text: responseText };
    }
    
    if (!response.ok) {
      // If we get a 429 (Too Many Requests) or 503 (Service Unavailable), retry
      if ((response.status === 429 || response.status === 503) && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`Rate limited or service unavailable. Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return linkKinToRepo(kinId, options, retryCount + 1);
      }
      
      throw new Error(`Failed to link kin ${kinId} to repo: ${JSON.stringify(data)}`);
    }
    
    console.log(`Successfully linked kin ${kinId} to repository:`, data);
    
    return {
      kin_id: kinId,
      status: 'linked',
      github_url: githubUrl,
      deploymentPlatform
    };
  } catch (error) {
    console.error(`Error linking kin ${kinId} to repository:`, error);
    
    // If we haven't reached max retries, try again
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      console.log(`Error occurred. Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return linkKinToRepo(kinId, options, retryCount + 1);
    }
    
    return {
      kin_id: kinId,
      status: 'error',
      error: error.message,
      deploymentPlatform: options.deploymentPlatform
    };
  }
}

/**
 * Link all kins to repositories
 * @param {Object} options - Options for linking kins
 * @param {string} options.deploymentPlatform - The deployment platform ('vercel' or 'render')
 */
async function linkAllKins(options = {}) {
  const { deploymentPlatform } = options;
  console.log(`Starting kin-repository linking process${deploymentPlatform ? ` for platform: ${deploymentPlatform}` : ''}...`);
  console.log(`Target repository: ${GITHUB_REPO_URL}`);
  
  const results = [];
  
  for (const model of AVAILABLE_MODELS) {
    // If a specific platform is requested, only link kins for models that prefer that platform
    // If no platform is specified, link kins for all models using their preferred platform
    const modelPlatform = deploymentPlatform || model.preferredPlatform || 'vercel';
    
    // Skip models that don't match the requested platform
    if (deploymentPlatform && model.preferredPlatform && model.preferredPlatform !== deploymentPlatform) {
      console.log(`Skipping ${model.id} (prefers ${model.preferredPlatform}, requested ${deploymentPlatform})`);
      continue;
    }
    
    const result = await linkKinToRepo(model.id, { deploymentPlatform: modelPlatform });
    results.push(result);
    
    // Add a delay between requests to avoid rate limiting
    if (AVAILABLE_MODELS.indexOf(model) < AVAILABLE_MODELS.length - 1) {
      console.log('Waiting 2 seconds before next request...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('Kin-repository linking process completed.');
  console.log('Summary:');
  results.forEach(result => {
    if (result.status === 'error') {
      console.log(`- ${result.kin_id}: ERROR - ${result.error}`);
    } else {
      console.log(`- ${result.kin_id}: Successfully linked to ${result.github_url} (Platform: ${result.deploymentPlatform})`);
    }
  });
  
  return results;
}

// Execute the script if run directly
if (require.main === module) {
  // Check if platform is specified as command line argument
  const args = process.argv.slice(2);
  const platform = args[0]; // Can be undefined, 'vercel', or 'render'
  
  if (platform && platform !== 'render' && platform !== 'vercel') {
    console.error('Invalid platform specified. Use "render" or "vercel" or omit for model-specific defaults.');
    process.exit(1);
  }
  
  linkAllKins({ deploymentPlatform: platform }).catch(error => {
    console.error('Script execution failed:', error);
    process.exit(1);
  });
}

// Export for potential use in other scripts
module.exports = {
  linkKinToRepo,
  linkAllKins
};
