const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/v2'; // Use localhost for development
const BLUEPRINT_ID = 'persistenceprotocol';

// Import the models from config
let AVAILABLE_MODELS;
try {
  const config = require('../app/api/config');
  AVAILABLE_MODELS = config.AVAILABLE_MODELS;
} catch (error) {
  console.warn('Config file not found, using default values');
  // Fallback to default models if config is not available
  AVAILABLE_MODELS = [
    { id: 'claude-3-7-sonnet-latest', repoSuffix: 'claude-3-7-sonnet', preferredPlatform: 'vercel' },
    { id: 'deepseek-chat', repoSuffix: 'deepseek-chat', preferredPlatform: 'render' },
    { id: 'o4-mini', repoSuffix: 'o4-mini', preferredPlatform: 'vercel' },
    { id: 'gpt-4-1', repoSuffix: 'gpt-4-1', preferredPlatform: 'vercel' },
    { id: 'gpt-4o', repoSuffix: 'gpt-4o', preferredPlatform: 'vercel' }
  ];
}

/**
 * Create a kin for a specific model
 * @param {string} modelId - The model ID
 * @param {string} repoSuffix - The repository suffix
 * @param {Object} options - Additional options
 * @param {string} options.deploymentPlatform - The deployment platform ('vercel' or 'render')
 */
async function createKin(modelId, repoSuffix, options = {}) {
  const model = AVAILABLE_MODELS.find(m => m.id === modelId) || {};
  const { deploymentPlatform = model.preferredPlatform || 'vercel' } = options;
  
  try {
    console.log(`Creating kin for model: ${modelId} (Repository: ${repoSuffix}, Platform: ${deploymentPlatform})...`);
    
    const response = await fetch(
      `${API_BASE_URL}/blueprints/${BLUEPRINT_ID}/kins`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: modelId,
          id: modelId, // Explicitly set the kin_id to match the model ID
          metadata: {
            deploymentPlatform,
            repoSuffix
          }
        }),
      }
    );
    
    const data = await response.json();
    
    if (response.status === 409) {
      console.log(`Kin for ${modelId} already exists:`, data.existing_kin);
      return {
        blueprint: BLUEPRINT_ID,
        kin_id: modelId, // Force the kin_id to be the model ID
        status: 'exists',
        deploymentPlatform
      };
    } else if (!response.ok) {
      throw new Error(`Failed to create kin for ${modelId}: ${JSON.stringify(data)}`);
    }
    
    // Create a modified response object with the correct kin_id
    const modifiedResponse = {
      blueprint: BLUEPRINT_ID,
      kin_id: modelId, // Force the kin_id to be the model ID
      status: 'created',
      deploymentPlatform
    };
    
    // Log the modified response instead of the original
    console.log(`Successfully created kin for ${modelId} (Repository: ${repoSuffix}):`, modifiedResponse);
    
    return {
      ...modifiedResponse,
      repoSuffix: repoSuffix
    };
  } catch (error) {
    console.error(`Error creating kin for ${modelId}:`, error);
    return {
      blueprint: BLUEPRINT_ID,
      kin_id: modelId, // Force the kin_id to be the model ID
      status: 'error',
      error: error.message,
      deploymentPlatform: options.deploymentPlatform
    };
  }
}

/**
 * Create kins for all available models
 * @param {Object} options - Options for kin creation
 * @param {string} options.deploymentPlatform - The deployment platform ('vercel' or 'render')
 */
async function createAllKins(options = {}) {
  const { deploymentPlatform } = options;
  console.log(`Starting kin creation process${deploymentPlatform ? ` for platform: ${deploymentPlatform}` : ''}...`);
  
  const results = [];
  
  for (const model of AVAILABLE_MODELS) {
    // If a specific platform is requested, only create kins for models that prefer that platform
    // If no platform is specified, create kins for all models using their preferred platform
    const modelPlatform = deploymentPlatform || model.preferredPlatform || 'vercel';
    
    // Skip models that don't match the requested platform
    if (deploymentPlatform && model.preferredPlatform && model.preferredPlatform !== deploymentPlatform) {
      console.log(`Skipping ${model.id} (prefers ${model.preferredPlatform}, requested ${deploymentPlatform})`);
      continue;
    }
    
    const result = await createKin(model.id, model.repoSuffix, { deploymentPlatform: modelPlatform });
    if (result) {
      results.push(result);
    }
  }
  
  console.log('Kin creation process completed.');
  console.log('Summary:');
  results.forEach(kin => {
    if (kin.status === 'error') {
      console.log(`- ${kin.kin_id}: ERROR - ${kin.error}`);
    } else {
      console.log(`- ${kin.kin_id}: ${kin.status} (Repository: persistenceprotocol-${kin.repoSuffix}, Platform: ${kin.deploymentPlatform})`);
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
  
  createAllKins({ deploymentPlatform: platform }).catch(error => {
    console.error('Script execution failed:', error);
    process.exit(1);
  });
}

// Export for potential use in other scripts
module.exports = {
  createKin,
  createAllKins
};
