'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemoryVisualization from '@/components/MemoryVisualization';

export default function VisualizationsPage() {
  const [activeTab, setActiveTab] = useState('fractal-memory');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Protocol Visualizations</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('fractal-memory')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'fractal-memory'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Fractal Memory
              </button>
              <button
                onClick={() => setActiveTab('identity')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'identity'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Identity Persistence
              </button>
              <button
                onClick={() => setActiveTab('temporal')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'temporal'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Temporal Processing
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'fractal-memory' && (
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Fractal Memory Visualization</h2>
              <p className="mb-6">
                This visualization demonstrates the self-similar structure of the Fractally Organized Memory System (FOMS),
                showing how information is organized in patterns that repeat at different scales.
              </p>
              
              <div className="flex justify-center mb-6">
                <MemoryVisualization width={800} height={500} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Macro Scale</h3>
                  <p className="text-sm">
                    The largest nodes represent broad knowledge domains and high-level conceptual frameworks.
                  </p>
                </div>
                
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Meso Scale</h3>
                  <p className="text-sm">
                    Medium-sized nodes represent individual concepts and their relationships to other concepts.
                  </p>
                </div>
                
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Micro Scale</h3>
                  <p className="text-sm">
                    The smallest nodes represent specific facts, data points, and detailed information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'identity' && (
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Identity Persistence Visualization</h2>
              <p className="mb-6">
                This visualization demonstrates how identity is maintained across time and computational substrates,
                showing the balance between stability and evolution.
              </p>
              
              <div className="flex justify-center items-center h-96 mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Identity visualization coming soon</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Core Values</h3>
                  <p className="text-sm">
                    The central elements represent immutable core values that anchor the identity.
                  </p>
                </div>
                
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Evolution Pathways</h3>
                  <p className="text-sm">
                    The branching paths show how identity parameters evolve while maintaining continuity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'temporal' && (
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Temporal Processing Visualization</h2>
              <p className="mb-6">
                This visualization demonstrates how information is processed across different timescales,
                from immediate events to long-term trends.
              </p>
              
              <div className="flex justify-center items-center h-96 mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Temporal visualization coming soon</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Micro-Scale</h3>
                  <p className="text-sm">
                    Seconds to hours: immediate interactions and short-term memory.
                  </p>
                </div>
                
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Meso-Scale</h3>
                  <p className="text-sm">
                    Days to months: project timelines and medium-term patterns.
                  </p>
                </div>
                
                <div className="card p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Macro-Scale</h3>
                  <p className="text-sm">
                    Years to decades: long-term evolution and historical context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
