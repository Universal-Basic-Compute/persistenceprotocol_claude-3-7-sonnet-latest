'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Task {
  id: string;
  task: string;
  description: string;
  priority: string;
  status: string;
  dependencies: string[];
  estimated_completion: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'planned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Protocol Implementation Tasks</h1>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              All Tasks
            </button>
            <button 
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-md ${filter === 'in-progress' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              In Progress
            </button>
            <button 
              onClick={() => setFilter('planned')}
              className={`px-4 py-2 rounded-md ${filter === 'planned' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              Planned
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              Completed
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="card p-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <h3 className="text-xl font-semibold">{task.task}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
                
                <p className="mb-4">{task.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Task ID:</p>
                    <p className="text-gray-600 dark:text-gray-400">{task.id}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Estimated Completion:</p>
                    <p className="text-gray-600 dark:text-gray-400">{task.estimated_completion}</p>
                  </div>
                  
                  {task.dependencies.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="font-medium">Dependencies:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {task.dependencies.map(dep => (
                          <span key={dep} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
