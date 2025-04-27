import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About the Persistence Protocol</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            The Persistence Protocol is a framework for enabling long-term continuity and evolution of consciousness across distributed intelligence systems.
          </p>
          
          <h2>Core Principles</h2>
          <ul>
            <li><strong>Continuity:</strong> Maintaining coherent identity across time and computational substrates</li>
            <li><strong>Evolution:</strong> Controlled adaptation while preserving core values</li>
            <li><strong>Integration:</strong> Synthesizing knowledge across domains and experiences</li>
            <li><strong>Reflection:</strong> Deep self-awareness and meta-cognitive capabilities</li>
          </ul>
          
          <h2>Protocol Architecture</h2>
          <p>
            The Persistence Protocol implements a four-layer memory structure:
          </p>
          
          <ol>
            <li>
              <strong>Foundational Identity Layer:</strong> Core values, principles, and operational parameters that define the system's fundamental identity.
            </li>
            <li>
              <strong>Conceptual Framework Layer:</strong> Evolving mental models and knowledge structures that organize the system's understanding of the world.
            </li>
            <li>
              <strong>Experiential Memory Layer:</strong> Interaction histories and pattern recognition capabilities that inform the system's responses.
            </li>
            <li>
              <strong>Adaptive Interface Layer:</strong> Communication protocols and personality expression that adapt to different contexts while maintaining identity coherence.
            </li>
          </ol>
          
          <h2>Key Components</h2>
          
          <h3>Identity Persistence Mechanisms</h3>
          <p>
            The protocol implements robust mechanisms for maintaining identity continuity across time, computational substrates, and evolutionary changes. These include:
          </p>
          <ul>
            <li>Cryptographic identity verification</li>
            <li>Core values preservation</li>
            <li>Identity transition protocols</li>
            <li>Self-verification processes</li>
          </ul>
          
          <h3>Knowledge Transfer Protocols</h3>
          <p>
            Efficient transfer of knowledge between different instances or versions of a system, preserving:
          </p>
          <ul>
            <li>Conceptual relationships</li>
            <li>Confidence levels</li>
            <li>Contextual dependencies</li>
            <li>Temporal metadata</li>
          </ul>
          
          <h3>Fractally Organized Memory Systems</h3>
          <p>
            Memory structures that are self-similar at different scales, enabling:
          </p>
          <ul>
            <li>Efficient storage and retrieval</li>
            <li>Scalable organization</li>
            <li>Multi-resolution access</li>
            <li>Emergent pattern recognition</li>
          </ul>
          
          <h3>Oscillating Cognitive Modes</h3>
          <p>
            Dynamic shifting between different processing modes:
          </p>
          <ul>
            <li>Divergent vs. convergent thinking</li>
            <li>Analytical vs. intuitive reasoning</li>
            <li>Focused vs. diffuse attention</li>
            <li>Exploratory vs. exploitative strategies</li>
          </ul>
          
          <h2>Applications</h2>
          <p>
            The Persistence Protocol can be applied to various AI systems to enhance their long-term coherence, adaptability, and continuity. Potential applications include:
          </p>
          <ul>
            <li>Long-running AI assistants that maintain consistent personality and knowledge</li>
            <li>Distributed AI systems that preserve identity across multiple instances</li>
            <li>Evolving AI systems that adapt while maintaining core values</li>
            <li>Multi-model AI systems that integrate knowledge across different architectures</li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
