'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModelCard from '@/components/ModelCard';
import { getRepositoryInfo } from '@/lib/api';
import { RepositoryInfo } from '@/types';

export default function ModelsPage() {
  const [repositories, setRepositories] = useState<RepositoryInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const repos = await getRepositoryInfo();
        setRepositories(repos);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Model Implementations</h1>
          <p className="text-lg">
            The Persistence Protocol has been implemented for various AI models, each with optimizations specific to the model's architecture and capabilities.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <ModelCard key={repo.name} repository={repo} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
