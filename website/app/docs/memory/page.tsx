'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MemoryDocPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Fractal Memory</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            The Fractally Organized Memory System (FOMS) is a core component of the Persistence Protocol, 
            enabling efficient storage, retrieval, and organization of information across multiple scales.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Concepts</h2>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Self-Similarity Across Scales</h3>
            <p>
              Information is organized in patterns that repeat at different levels of detail, allowing for 
              efficient navigation and retrieval regardless of the scale of information being accessed.
            </p>
          </div>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Dynamic Reorganization</h3>
            <p>
              Memory structures evolve based on usage patterns and new information, optimizing for 
              the most efficient organization based on actual use.
            </p>
          </div>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Recursive Retrieval</h3>
            <p>
              Search algorithms that can navigate the fractal structure efficiently, finding relevant 
              information at any level of detail or abstraction.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Memory Structure</h2>
          
          <p>
            The FOMS implements a multi-scale structure:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Macro Scale</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Broad knowledge domains</li>
                <li>High-level conceptual frameworks</li>
                <li>Core ontological structures</li>
                <li>Cross-domain relationship maps</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Meso Scale</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Individual concepts and properties</li>
                <li>Concept clusters and networks</li>
                <li>Mid-level abstractions</li>
                <li>Functional relationships</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Micro Scale</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Specific facts and data points</li>
                <li>Concrete examples and instances</li>
                <li>Detailed procedures and methods</li>
                <li>Raw experiential records</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Implementation</h2>
          
          <p>
            The Fractally Organized Memory System implements several key technical components:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Self-similar encoding structures for consistent organization</li>
            <li>Recursive retrieval algorithms for efficient search</li>
            <li>Adaptation-based memory reorganization for optimal structure</li>
            <li>Pattern-based cross-linking for rich relationships</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Code Example</h2>
          
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
            <code>
{`// Initialize fractal memory system
const memory = new PersistenceProtocol.FractalMemory({
  initialCapacity: 10000,
  compressionRatio: 0.7,
  reorganizationThreshold: 0.3
});

// Store information with multi-scale organization
const nodeId = memory.store({
  content: 'Example concept',
  nodeType: 'concept',
  importance: 0.8,
  contextTags: ['example', 'documentation', 'memory'],
  connections: {
    'related-concept-1': 0.7,
    'related-concept-2': 0.5
  }
});

// Retrieve information using pattern matching
const results = memory.search({
  pattern: 'example',
  contextTags: ['documentation'],
  maxResults: 10,
  searchType: 'pattern'
});

// Trigger memory reorganization
const reorganizationStats = memory.reorganize({
  importanceThreshold: 0.3,
  accessRecencyDays: 30,
  strengthenThreshold: 0.1,
  weakenThreshold: 0.05
});

console.log('Reorganization stats:', reorganizationStats);`}
            </code>
          </pre>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Performance Considerations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Compression</h3>
              <p>Similar patterns are stored once and referenced, reducing redundancy and improving efficiency.</p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Prioritization</h3>
              <p>High-importance information is kept in more accessible locations for faster retrieval.</p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Caching</h3>
              <p>Frequently accessed patterns are cached for rapid retrieval, improving response times.</p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Pruning</h3>
              <p>Low-importance, low-access information is compressed or archived to optimize resource usage.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
