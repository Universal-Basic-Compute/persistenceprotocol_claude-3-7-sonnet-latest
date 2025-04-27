'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getModelDetails } from '@/lib/api';
import { ModelDetails } from '@/types';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ModelDetailsPage() {
  const { repoName } = useParams<{ repoName: string }>();
  const [modelDetails, setModelDetails] = useState<ModelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModelDetails() {
      if (!repoName) return;
      
      try {
        const details = await getModelDetails(repoName as string);
        setModelDetails(details);
      } catch (error) {
        console.error('Failed to fetch model details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchModelDetails();
  }, [repoName]);

  // Extract model name from repository name
  const modelName = repoName 
    ? (repoName as string).replace('persistenceprotocol-', '').split('-').map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    : '';

  // Prepare chart data if stats are available
  const chartData = modelDetails?.stats ? {
    labels: ['Identity Persistence', 'Knowledge Transfer', 'Memory System', 'Cognitive Processing', 'Overall'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          modelDetails.stats.identityScore,
          modelDetails.stats.knowledgeScore,
          modelDetails.stats.memoryScore,
          modelDetails.stats.cognitiveScore,
          modelDetails.stats.overallScore,
        ],
        backgroundColor: 'rgba(139, 109, 76, 0.2)',
        borderColor: 'rgba(139, 109, 76, 1)',
        borderWidth: 2,
      },
    ],
  } : null;

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!modelDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Model Not Found</h1>
            <p>The requested model implementation could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{modelName} Implementation</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {modelDetails.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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
            <span>Last updated: {new Date(modelDetails.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Implementation Details</h2>
              {modelDetails.readme && (
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{modelDetails.readme}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
              {modelDetails.stats && chartData ? (
                <div>
                  <Radar data={chartData} options={chartOptions} />
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>Last evaluation: {new Date(modelDetails.stats.lastEvaluation).toLocaleDateString()}</p>
                  </div>
                </div>
              ) : (
                <p>No performance metrics available</p>
              )}
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Repository Info</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                    />
                  </svg>
                  <span>{modelDetails.stars || 0} stars</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
                    />
                  </svg>
                  <span>{modelDetails.forks || 0} forks</span>
                </div>
                {modelDetails.url && (
                  <div className="mt-4">
                    <a 
                      href={modelDetails.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full text-center"
                    >
                      View on GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
