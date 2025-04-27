const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
let config;

try {
  config = require('../app/api/config');
} catch (error) {
  console.warn('Config file not found, using default values');
  config = { 
    RENDER_CONFIG: { websiteName: 'persistence-protocol-website' },
    VERCEL_CONFIG: { websiteName: 'persistence-protocol-website' }
  };
}

/**
 * Deploy the website to a specified platform (Render.com or Vercel)
 * @param {string} platform - The platform to deploy to ('render' or 'vercel')
 */
async function deployWebsite(platform = 'vercel') {
  const isVercel = platform.toLowerCase() === 'vercel';
  const platformName = isVercel ? 'Vercel' : 'Render.com';
  
  console.log(`Deploying website to ${platformName}...`);
  
  // Check if the website directory exists
  const websiteDir = path.join(__dirname, '..', 'website');
  if (!fs.existsSync(websiteDir)) {
    console.error(`Website directory not found: ${websiteDir}`);
    process.exit(1);
  }
  
  if (isVercel) {
    // Check if vercel.json exists
    const vercelJsonPath = path.join(websiteDir, 'vercel.json');
    if (!fs.existsSync(vercelJsonPath)) {
      console.log('vercel.json not found in website directory. Using root vercel.json...');
      const rootVercelJsonPath = path.join(__dirname, '..', 'vercel.json');
      
      if (fs.existsSync(rootVercelJsonPath)) {
        console.log('Copying root vercel.json to website directory...');
        fs.copyFileSync(rootVercelJsonPath, vercelJsonPath);
      } else {
        console.log('Creating a default vercel.json configuration...');
        const defaultVercelConfig = {
          "version": 2,
          "builds": [
            { "src": "package.json", "use": "@vercel/next" }
          ],
          "routes": [
            { "src": "/api/(.*)", "dest": "/api/$1" },
            { "src": "/(.*)", "dest": "/$1" }
          ]
        };
        fs.writeFileSync(vercelJsonPath, JSON.stringify(defaultVercelConfig, null, 2));
        console.log('Created default vercel.json');
      }
    }
  } else {
    // Check if render.yaml exists
    const renderYamlPath = path.join(websiteDir, 'render.yaml');
    if (!fs.existsSync(renderYamlPath)) {
      console.error(`render.yaml not found: ${renderYamlPath}`);
      process.exit(1);
    }
  }
  
  try {
    if (isVercel) {
      // Check if Vercel CLI is installed
      try {
        execSync('vercel --version', { stdio: 'ignore' });
      } catch (error) {
        console.log('Vercel CLI not found. Installing...');
        execSync('npm install -g vercel');
      }
      
      // Deploy to Vercel
      console.log('Deploying to Vercel...');
      execSync(`cd ${websiteDir} && vercel --prod`, { stdio: 'inherit' });
      
      console.log('Website deployed successfully to Vercel!');
      if (config.VERCEL_CONFIG && config.VERCEL_CONFIG.websiteName) {
        console.log(`Visit your website at: https://${config.VERCEL_CONFIG.websiteName}.vercel.app`);
      } else {
        console.log('Visit your website at the URL provided by Vercel CLI');
      }
    } else {
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
      
      console.log('Website deployed successfully to Render.com!');
      if (config.RENDER_CONFIG && config.RENDER_CONFIG.websiteName) {
        console.log(`Visit your website at: https://${config.RENDER_CONFIG.websiteName}.onrender.com`);
      } else {
        console.log('Visit your website at the URL provided by Render CLI');
      }
    }
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

// Execute the script if run directly
if (require.main === module) {
  // Check if platform is specified as command line argument
  const args = process.argv.slice(2);
  const platform = args[0] || 'vercel'; // Default to Vercel if not specified
  
  if (platform !== 'render' && platform !== 'vercel') {
    console.error('Invalid platform specified. Use "render" or "vercel".');
    process.exit(1);
  }
  
  deployWebsite(platform).catch(error => {
    console.error('Script execution failed:', error);
    process.exit(1);
  });
}

// Export for potential use in other scripts
module.exports = {
  deployWebsite
};
