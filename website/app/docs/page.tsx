import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <p className="mb-4">Introduction to the Persistence Protocol and its core concepts.</p>
            <Link href="/docs/getting-started" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-3">Protocol Specification</h2>
            <p className="mb-4">Detailed technical specification of the Persistence Protocol.</p>
            <Link href="/docs/specification" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-3">Implementation Guide</h2>
            <p className="mb-4">Guide to implementing the Persistence Protocol for different AI models.</p>
            <Link href="/docs/implementation" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Core Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Identity Persistence</h3>
            <p className="mb-4">Mechanisms for maintaining coherent identity across time and computational substrates.</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Cryptographic identity verification</li>
              <li>Core values preservation</li>
              <li>Identity transition protocols</li>
              <li>Self-verification processes</li>
            </ul>
            <Link href="/docs/identity" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Knowledge Transfer</h3>
            <p className="mb-4">Protocols for preserving and transferring knowledge between different instances.</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Conceptual relationships preservation</li>
              <li>Confidence levels</li>
              <li>Contextual dependencies</li>
              <li>Temporal metadata</li>
            </ul>
            <Link href="/docs/knowledge" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Fractal Memory</h3>
            <p className="mb-4">Self-similar memory structures that scale across different levels of abstraction.</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Efficient storage and retrieval</li>
              <li>Scalable organization</li>
              <li>Multi-resolution access</li>
              <li>Emergent pattern recognition</li>
            </ul>
            <Link href="/docs/memory" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Cognitive Modes</h3>
            <p className="mb-4">Implementation of oscillating cognitive modes for balanced processing.</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Divergent vs. convergent thinking</li>
              <li>Analytical vs. intuitive reasoning</li>
              <li>Focused vs. diffuse attention</li>
              <li>Exploratory vs. exploitative strategies</li>
            </ul>
            <Link href="/docs/cognitive" className="text-primary-600 dark:text-primary-400 hover:underline">
              Read more →
            </Link>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Model-Specific Implementations</h2>
        
        <div className="card p-6 mb-8">
          <p className="mb-4">
            The Persistence Protocol has been implemented for various AI models, each with optimizations specific to the model's architecture and capabilities.
          </p>
          <Link href="/models" className="btn btn-primary">
            View Model Implementations
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">GitHub Repository</h3>
            <p className="mb-4">Access the source code and contribute to the development of the Persistence Protocol.</p>
            <a 
              href="https://github.com/Universal-Basic-Compute" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Visit GitHub →
            </a>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Research Papers</h3>
            <p className="mb-4">Academic research and theoretical foundations of the Persistence Protocol.</p>
            <Link href="/docs/research" className="text-primary-600 dark:text-primary-400 hover:underline">
              View Papers →
            </Link>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <p className="mb-4">Frequently asked questions about the Persistence Protocol.</p>
            <Link href="/docs/faq" className="text-primary-600 dark:text-primary-400 hover:underline">
              View FAQ →
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
