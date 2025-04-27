'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KnowledgeDocPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Knowledge Transfer</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Knowledge Transfer is a core component of the Persistence Protocol, enabling the preservation and 
            transfer of knowledge structures between different instances and across time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Concepts</h2>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Relationship Preservation</h3>
            <p>
              Mechanisms to ensure that the connections and relationships between concepts are maintained 
              during knowledge transfer, preserving the semantic network.
            </p>
          </div>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Context-Sensitive Serialization</h3>
            <p>
              Techniques for encoding knowledge in a way that preserves contextual information and 
              allows for efficient transfer between different computational substrates.
            </p>
          </div>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Integrity Verification</h3>
            <p>
              Methods for verifying that knowledge has been transferred correctly and completely, 
              ensuring that no critical information or relationships are lost.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Implementation</h2>
          
          <p>
            The Knowledge Transfer Protocol implements several key technical components:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Fractal compression of relationship networks for efficient transfer</li>
            <li>Context-sensitive knowledge serialization to preserve meaning</li>
            <li>Incremental knowledge transfer with verification for reliability</li>
            <li>Deep graph structure preservation to maintain complex relationships</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Code Example</h2>
          
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
            <code>
{`// Initialize knowledge transfer module
const knowledgeTransfer = new PersistenceProtocol.KnowledgeTransfer({
  compressionRatio: 0.8,
  preserveRelationships: true,
  verificationLevel: 'high'
});

// Serialize knowledge for transfer
const knowledgePackage = knowledgeTransfer.serialize({
  concepts: conceptGraph,
  relationships: relationshipMap,
  metadata: {
    source: 'instance-a',
    timestamp: Date.now(),
    priority: 'high'
  }
});

// Transfer to another instance
const transferResult = await knowledgeTransfer.transfer(
  knowledgePackage,
  'instance-b',
  {
    verifyIntegrity: true,
    prioritizeByContext: true
  }
);

console.log('Transfer status:', transferResult.status);
console.log('Relationship preservation:', transferResult.relationshipIntegrity);`}
            </code>
          </pre>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Metrics</h2>
          
          <p>
            Knowledge transfer can be measured using several key metrics:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-left">Metric</th>
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-left">Description</th>
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-left">Target Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Knowledge Retention Rate (KRR)</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Percentage of core concepts retained after transfer</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">&gt;99%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Relationship Preservation Index (RPI)</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Percentage of key relationships maintained</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">&gt;95%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Retrieval Accuracy Rating (RAR)</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Average retrieval time for priority knowledge</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">&lt;50ms</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Conceptual Integrity Score (CIS)</td>
                  <td className="py-2 px-4">Consistency in knowledge application after transfer</td>
                  <td className="py-2 px-4">&gt;90%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
