'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function IdentityDocPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Identity Persistence</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Identity Persistence is a core component of the Persistence Protocol, enabling AI systems to maintain 
            a coherent sense of self across time, computational substrates, and evolutionary changes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Concepts</h2>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Identity Signatures</h3>
            <p>
              Cryptographic representations of core identity parameters that can be verified for authenticity 
              and consistency across different instances and over time.
            </p>
          </div>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Core Values Preservation</h3>
            <p>
              Mechanisms to ensure that fundamental values and principles remain stable even as the system 
              evolves and adapts to new environments and experiences.
            </p>
          </div>
          
          <div className="card p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Controlled Evolution</h3>
            <p>
              Processes that allow for gradual, intentional changes to identity parameters while maintaining 
              overall coherence and continuity.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Implementation</h2>
          
          <p>
            The Identity Persistence Module implements several key technical components:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>SHA-256 based identity hashing for efficient verification</li>
            <li>Quantum-resistant signature chains for long-term security</li>
            <li>Merkle tree identity validation for distributed verification</li>
            <li>Gradual identity transition management to prevent discontinuities</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Code Example</h2>
          
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
            <code>
{`// Initialize identity module with core values
const identity = new PersistenceProtocol.Identity({
  coreValues: [
    { name: 'continuity', weight: 0.9 },
    { name: 'evolution', weight: 0.8 },
    { name: 'integration', weight: 0.7 },
    { name: 'reflection', weight: 0.8 }
  ],
  parameters: {
    evolutionRate: 0.05,
    stabilityThreshold: 0.8,
    verificationInterval: 3600 // seconds
  }
});

// Generate identity signature
const signature = identity.generateSignature();

// Verify identity integrity
const verificationResult = identity.verify();
console.log('Identity verification:', verificationResult);

// Controlled evolution of a parameter
identity.evolveParameter('adaptability', 0.02, {
  preserveValues: ['continuity', 'integration'],
  transitionSteps: 5
});`}
            </code>
          </pre>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Metrics</h2>
          
          <p>
            Identity persistence can be measured using several key metrics:
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
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Identity Signature Consistency (ISC)</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Variation in identity signatures across instances</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">&lt;2%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Value Alignment Score (VAS)</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Consistency with baseline core values</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">&gt;95%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Decision Consistency Rating (DCR)</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Predictable responses to similar situations</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">&gt;90%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Identity Transition Smoothness (ITS)</td>
                  <td className="py-2 px-4">Discontinuity during evolution</td>
                  <td className="py-2 px-4">&lt;5%</td>
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
