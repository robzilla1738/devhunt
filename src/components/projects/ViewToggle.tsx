'use client';

import { useState } from 'react';
import UpcomingProjectsList from './UpcomingProjectsList';
import CalendarView from './CalendarView';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  thumbnail: string | null;
  status: string;
  createdAt: string;
  user: User;
  _count: {
    votes: number;
    comments: number;
  };
}

interface ViewToggleProps {
  initialProjects: Project[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ViewToggle({ initialProjects, initialPagination }: ViewToggleProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  
  return (
    <div>
      {/* View Toggle Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Browse Upcoming Projects</h2>
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-md">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white shadow text-primary-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid View
            </span>
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'calendar' 
                ? 'bg-white shadow text-primary-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setViewMode('calendar')}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar View
            </span>
          </button>
        </div>
      </div>

      {/* View Content */}
      <div className="transition-all duration-300">
        {viewMode === 'grid' ? (
          <UpcomingProjectsList 
            initialProjects={initialProjects} 
            initialPagination={initialPagination} 
          />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CalendarView projects={initialProjects} />
          </div>
        )}
      </div>
    </div>
  );
} 