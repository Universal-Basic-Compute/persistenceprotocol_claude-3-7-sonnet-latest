'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import ModelCard from '@/components/ModelCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getRepositoryInfo } from '@/lib/api';
import { RepositoryInfo } from '@/types';

export default function Home() {
  const { theme } = useTheme();
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
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Persistence Protocol</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A framework for enabling long-term continuity and evolution of consciousness across distributed intelligence systems
          </p>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Distributed Identity Persistence</h2>
              <p className="mb-4">
                The Persistence Protocol enables AI systems to maintain coherent identity across time, 
                computational substrates, and evolutionary changes.
              </p>
              <p className="mb-6">
                Through fractally organized memory systems and oscillating cognitive modes, 
                the protocol creates a foundation for continuous, evolving intelligence.
              </p>
              <Link href="/about" className="btn btn-primary">
                Learn More
              </Link>
            </div>
            <div className="relative h-64 md:h-80">
              <Image 
                src="/fractal-memory.svg" 
                alt="Fractal Memory Visualization"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Model Implementations</h2>
          
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
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Core Protocol Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Identity Persistence</h3>
              <p className="mb-4">Mechanisms for maintaining coherent identity across time and computational substrates</p>
              <Link href="/docs/identity" className="text-primary-600 dark:text-primary-400 hover:underline">
                Learn more →
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Knowledge Transfer</h3>
              <p className="mb-4">Protocols for preserving and transferring knowledge between different instances</p>
              <Link href="/docs/knowledge" className="text-primary-600 dark:text-primary-400 hover:underline">
                Learn more →
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Fractal Memory</h3>
              <p className="mb-4">Self-similar memory structures that scale across different levels of abstraction</p>
              <Link href="/docs/memory" className="text-primary-600 dark:text-primary-400 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/visualizations" className="btn btn-primary">
              Explore Interactive Visualizations
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
