const API_BASE_URL = 'http://localhost:5000/v2'; // Use localhost for development
const BLUEPRINT_ID = 'persistenceprotocol';

// Import the models from config
const { AVAILABLE_MODELS } = require('../app/api/config');

async function createKin(modelId, repoSuffix) {
  try {
    console.log(`Creating kin for model: ${modelId} (Repository: ${repoSuffix})...`);
    
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
        }),
      }
    );
    
    const data = await response.json();
    
    if (response.status === 409) {
      console.log(`Kin for ${modelId} already exists:`, data.existing_kin);
      return {
        blueprint: BLUEPRINT_ID,
        kin_id: modelId, // Force the kin_id to be the model ID
        status: 'exists'
      };
    } else if (!response.ok) {
      throw new Error(`Failed to create kin for ${modelId}: ${JSON.stringify(data)}`);
    }
    
    // Create a modified response object with the correct kin_id
    const modifiedResponse = {
      blueprint: BLUEPRINT_ID,
      kin_id: modelId, // Force the kin_id to be the model ID
      status: 'created'
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
      error: error.message
    };
  }
}

async function createAllKins() {
  console.log('Starting kin creation process...');
  
  const results = [];
  
  for (const model of AVAILABLE_MODELS) {
    const result = await createKin(model.id, model.repoSuffix);
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
      console.log(`- ${kin.kin_id}: ${kin.status} (Repository: persistenceprotocol-${kin.repoSuffix})`);
    }
  });
}

// Execute the script
createAllKins().catch(error => {
  console.error('Script execution failed:', error);
  process.exit(1);
});
