'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

export default function FullSpecPage() {
  const [specContent, setSpecContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch the spec from an API or markdown file
    // For now, we'll simulate a fetch with a timeout
    const timer = setTimeout(() => {
      fetch('/api/spec')
        .then(response => response.json())
        .then(data => {
          setSpecContent(data.content);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch spec:', error);
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Persistence Protocol: Technical Specification</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="card p-6">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{specContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
