'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { MemoryVisualization } from '@/components/MemoryVisualization';

export default function VisualizationsPage() {
  const [activeTab, setActiveTab] = useState<'fractal' | 'identity' | 'temporal'>('fractal');
  
  // Sample data for visualizations
  const fractalData = {
    nodes: [
      { id: 'root', label: 'Memory Root', level: 0 },
      { id: 'identity', label: 'Identity', level: 1 },
      { id: 'knowledge', label: 'Knowledge', level: 1 },
      { id: 'experience', label: 'Experience', level: 1 },
      { id: 'core-values', label: 'Core Values', level: 2, parent: 'identity' },
      { id: 'self-model', label: 'Self Model', level: 2, parent: 'identity' },
      { id: 'domain-knowledge', label: 'Domain Knowledge', level: 2, parent: 'knowledge' },
      { id: 'conceptual-frameworks', label: 'Conceptual Frameworks', level: 2, parent: 'knowledge' },
      { id: 'interactions', label: 'Interactions', level: 2, parent: 'experience' },
      { id: 'temporal-events', label: 'Temporal Events', level: 2, parent: 'experience' },
    ],
    links: [
      { source: 'root', target: 'identity' },
      { source: 'root', target: 'knowledge' },
      { source: 'root', target: 'experience' },
      { source: 'identity', target: 'core-values' },
      { source: 'identity', target: 'self-model' },
      { source: 'knowledge', target: 'domain-knowledge' },
      { source: 'knowledge', target: 'conceptual-frameworks' },
      { source: 'experience', target: 'interactions' },
      { source: 'experience', target: 'temporal-events' },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Protocol Visualizations</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('fractal')}
                className={`${
                  activeTab === 'fractal'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Fractal Memory
              </button>
              <button
                onClick={() => setActiveTab('identity')}
                className={`${
                  activeTab === 'identity'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Identity Persistence
              </button>
              <button
                onClick={() => setActiveTab('temporal')}
                className={`${
                  activeTab === 'temporal'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Temporal Processing
              </button>
            </nav>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {activeTab === 'fractal' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Fractal Memory Visualization</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                This visualization demonstrates the self-similar, multi-scale organization of the Fractally Organized Memory System (FOMS).
                Each node represents a memory element, with connections showing relationships between concepts at different scales.
              </p>
              <div className="h-[600px] w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <MemoryVisualization data={fractalData} width={800} height={600} />
              </div>
            </div>
          )}
          
          {activeTab === 'identity' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Identity Persistence Visualization</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                This visualization shows how identity is maintained across time and computational substrates.
                The core identity signature remains stable while allowing for controlled evolution.
              </p>
              <div className="h-[600px] w-full border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Identity visualization coming soon</p>
              </div>
            </div>
          )}
          
          {activeTab === 'temporal' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Temporal Processing Visualization</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                This visualization demonstrates how the Temporal Processing Engine integrates information across different timescales,
                from milliseconds to years, enabling coherent reasoning across time.
              </p>
              <div className="h-[600px] w-full border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Temporal visualization coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
