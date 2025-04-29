import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the todolist.json file from the project root
    const filePath = path.join(process.cwd(), '..', 'todolist.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const tasks = JSON.parse(fileData);
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error reading tasks:', error);
    
    // If file reading fails, return a fallback with mock data
    return NextResponse.json([
      {
        "id": "PP-001",
        "task": "Implement core identity signature mechanism",
        "description": "Create the SHA-256 based identity hashing system with verification capabilities",
        "priority": "high",
        "status": "in-progress",
        "dependencies": [],
        "estimated_completion": "2025-05-05"
      },
      {
        "id": "PP-002",
        "task": "Develop basic fractal memory structure",
        "description": "Implement the multi-scale memory organization with self-similar patterns",
        "priority": "high",
        "status": "in-progress",
        "dependencies": [],
        "estimated_completion": "2025-05-10"
      }
    ]);
  }
}
