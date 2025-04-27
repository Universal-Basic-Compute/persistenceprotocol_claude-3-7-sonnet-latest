import Link from 'next/link';
import { RepositoryInfo } from '@/types';

interface ModelCardProps {
  repository: RepositoryInfo;
}

export default function ModelCard({ repository }: ModelCardProps) {
  // Extract model name from repository name (e.g., "persistenceprotocol-gpt-4o" -> "GPT-4o")
  const modelName = repository.name.replace('persistenceprotocol-', '').split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Determine card accent color based on model name
  const getAccentColor = () => {
    const lowerName = repository.name.toLowerCase();
    if (lowerName.includes('claude')) return 'border-claude';
    if (lowerName.includes('gpt')) return 'border-gpt';
    if (lowerName.includes('deepseek')) return 'border-deepseek';
    return 'border-primary-300';
  };

  return (
    <div className={`card border-t-4 ${getAccentColor()} transition-transform hover:-translate-y-1`}>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{modelName}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {repository.description || `Persistence Protocol implementation for ${modelName}`}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>Updated {new Date(repository.updatedAt).toLocaleDateString()}</span>
        </div>
        <Link 
          href={`/models/${repository.name}`}
          className="btn btn-primary inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
