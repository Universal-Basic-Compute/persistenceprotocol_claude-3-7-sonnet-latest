export interface RepositoryInfo {
  name: string;
  description: string;
  updatedAt: string;
  url?: string;
  stars?: number;
  forks?: number;
}

export interface ModelStats {
  identityScore: number;
  knowledgeScore: number;
  memoryScore: number;
  cognitiveScore: number;
  overallScore: number;
  lastEvaluation: string;
}

export interface ModelDetails extends RepositoryInfo {
  stats?: ModelStats;
  readme?: string;
}
