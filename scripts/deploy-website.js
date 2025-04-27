const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { RENDER_CONFIG } = require('../app/api/config');

/**
 * Deploy the website to Render.com
 */
async function deployWebsite() {
  console.log('Deploying website to Render.com...');
  
  // Check if the website directory exists
  const websiteDir = path.join(__dirname, '..', 'website');
  if (!fs.existsSync(websiteDir)) {
    console.error(`Website directory not found: ${websiteDir}`);
    process.exit(1);
  }
  
  // Check if render.yaml exists
  const renderYamlPath = path.join(websiteDir, 'render.yaml');
  if (!fs.existsSync(renderYamlPath)) {
    console.error(`render.yaml not found: ${renderYamlPath}`);
    process.exit(1);
  }
  
  try {
    // Check if Render CLI is installed
    try {
      execSync('render --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('Render CLI not found. Installing...');
      execSync('npm install -g @render/cli');
    }
    
    // Deploy to Render.com
    console.log('Deploying to Render.com...');
    execSync(`cd ${websiteDir} && render deploy`, { stdio: 'inherit' });
    
    console.log('Website deployed successfully!');
    console.log(`Visit your website at: https://${RENDER_CONFIG.websiteName}.onrender.com`);
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

// Execute the script if run directly
if (require.main === module) {
  deployWebsite().catch(error => {
    console.error('Script execution failed:', error);
    process.exit(1);
  });
}

// Export for potential use in other scripts
module.exports = {
  deployWebsite
};
