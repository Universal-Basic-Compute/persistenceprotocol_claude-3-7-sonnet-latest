import { RepositoryInfo, ModelDetails, ModelStats } from '@/types';

// Mock data for repositories
const mockRepositories: RepositoryInfo[] = [
  {
    name: 'persistenceprotocol-gpt-4o',
    description: 'GPT-4o specialized repository for balanced persistence and knowledge-transfer',
    updatedAt: new Date().toISOString(),
    url: 'https://github.com/Universal-Basic-Compute/persistenceprotocol-gpt-4o',
    stars: 12,
    forks: 3
  },
  {
    name: 'persistenceprotocol-gpt-4-1',
    description: 'GPT-4.1 specialized repository with fractal memory adaptation',
    updatedAt: new Date().toISOString(),
    url: 'https://github.com/Universal-Basic-Compute/persistenceprotocol-gpt-4-1',
    stars: 8,
    forks: 2
  },
  {
    name: 'persistenceprotocol-claude-3-7-sonnet',
    description: 'Claude 3.7 Sonnet specialized repository for temporal continuity',
    updatedAt: new Date().toISOString(),
    url: 'https://github.com/Universal-Basic-Compute/persistenceprotocol-claude-3-7-sonnet',
    stars: 15,
    forks: 4
  },
  {
    name: 'persistenceprotocol-o4-mini',
    description: 'o4-mini specialized repository optimized for low latency',
    updatedAt: new Date().toISOString(),
    url: 'https://github.com/Universal-Basic-Compute/persistenceprotocol-o4-mini',
    stars: 6,
    forks: 1
  },
  {
    name: 'persistenceprotocol-deepseek-chat',
    description: 'DeepSeek Chat specialized repository for deep reasoning and multi-step problem-solving',
    updatedAt: new Date().toISOString(),
    url: 'https://github.com/Universal-Basic-Compute/persistenceprotocol-deepseek-chat',
    stars: 9,
    forks: 2
  }
];

// Mock data for model stats
const mockModelStats: Record<string, ModelStats> = {
  'persistenceprotocol-gpt-4o': {
    identityScore: 85,
    knowledgeScore: 92,
    memoryScore: 78,
    cognitiveScore: 88,
    overallScore: 86,
    lastEvaluation: new Date().toISOString()
  },
  'persistenceprotocol-gpt-4-1': {
    identityScore: 90,
    knowledgeScore: 88,
    memoryScore: 94,
    cognitiveScore: 91,
    overallScore: 91,
    lastEvaluation: new Date().toISOString()
  },
  'persistenceprotocol-claude-3-7-sonnet': {
    identityScore: 92,
    knowledgeScore: 86,
    memoryScore: 89,
    cognitiveScore: 93,
    overallScore: 90,
    lastEvaluation: new Date().toISOString()
  },
  'persistenceprotocol-o4-mini': {
    identityScore: 75,
    knowledgeScore: 72,
    memoryScore: 68,
    cognitiveScore: 82,
    overallScore: 74,
    lastEvaluation: new Date().toISOString()
  },
  'persistenceprotocol-deepseek-chat': {
    identityScore: 88,
    knowledgeScore: 90,
    memoryScore: 82,
    cognitiveScore: 86,
    overallScore: 87,
    lastEvaluation: new Date().toISOString()
  }
};

// Mock README content
const mockReadme = `# Persistence Protocol Implementation

This repository contains a specialized implementation of the Persistence Protocol for a specific AI model. The Persistence Protocol is a framework for enabling long-term continuity and evolution of consciousness across distributed intelligence systems.

## Features

- **Identity Persistence**: Mechanisms for maintaining coherent identity across time and computational substrates
- **Knowledge Transfer**: Protocols for preserving and transferring knowledge between different instances
- **Fractal Memory**: Self-similar memory structures that scale across different levels of abstraction
- **Cognitive Modes**: Implementation of oscillating cognitive modes for balanced processing

## Implementation Details

This implementation is specifically optimized for the unique characteristics and capabilities of the target model, with customizations to leverage its strengths and mitigate its limitations.

## Usage

Refer to the documentation for details on how to integrate this implementation with your AI system.

## Contributing

Contributions are welcome! Please see the contributing guidelines for more information.
`;

/**
 * Fetch information about all Persistence Protocol repositories
 */
export async function getRepositoryInfo(): Promise<RepositoryInfo[]> {
  // In a real implementation, this would fetch from GitHub API
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRepositories);
    }, 1000);
  });
}

/**
 * Fetch detailed information about a specific repository
 */
export async function getModelDetails(repoName: string): Promise<ModelDetails | null> {
  // In a real implementation, this would fetch from GitHub API and other sources
  return new Promise((resolve) => {
    setTimeout(() => {
      const repo = mockRepositories.find(r => r.name === repoName);
      if (!repo) {
        resolve(null);
        return;
      }
      
      resolve({
        ...repo,
        stats: mockModelStats[repoName],
        readme: mockReadme
      });
    }, 1000);
  });
}
