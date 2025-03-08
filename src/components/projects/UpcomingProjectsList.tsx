'use client';

import { useState, useEffect } from 'react';

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

interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UpcomingProjectsListProps {
  initialProjects: Project[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function UpcomingProjectsList({
  initialProjects,
  initialPagination
}: UpcomingProjectsListProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [pagination, setPagination] = useState(initialPagination);
  const [sort, setSort] = useState('newest');
  const [status, setStatus] = useState('beta');
  const [search, setSearch] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status, // Use the status state
        sort,
        search,
      });

      const response = await fetch(`/api/projects?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data: ProjectsResponse = await response.json();
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Refetch when page, sort, status or search changes
  useEffect(() => {
    fetchProjects();
  }, [pagination.page, sort, status, search]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on sort change
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on status change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          {/* Search */}
          <form onSubmit={handleSubmitSearch} className="relative w-full md:w-64">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <div className="inline-flex shadow-sm rounded-md">
              <button
                onClick={() => handleStatusChange('beta')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  status === 'beta'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Beta
              </button>
              <button
                onClick={() => handleStatusChange('development')}
                className={`px-4 py-2 text-sm font-medium ${
                  status === 'development'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300'
                }`}
              >
                Development
              </button>
              <button
                onClick={() => handleStatusChange('launched')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  status === 'launched'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Launched
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={handleSortChange}
                className="appearance-none w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary-600"></div>
          <p className="mt-4 text-gray-500">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={fetchProjects}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-100 p-8 rounded-lg max-w-lg mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">No projects found</h3>
            <p className="text-gray-500 mt-2">We couldn't find any projects matching your criteria.</p>
            <button
              onClick={() => {
                setSearch('');
                setStatus('beta');
                setSort('newest');
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a 
                href={`/projects/${project.slug}`} 
                key={project.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="relative h-40 bg-gray-100">
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600">
                      <span className="text-white text-3xl font-bold">{project.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-80 text-white px-2 py-1 rounded-md text-xs">
                    {project.status}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2 h-10">
                    {project.tagline}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      {project.user.image ? (
                        <img 
                          src={project.user.image} 
                          alt={project.user.name || 'User'} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-600 text-xs">
                          {project.user.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <span className="text-sm text-gray-600">
                        {project.user.name || 'Anonymous'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="flex items-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {project._count.votes}
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {project._count.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`px-3 py-1 rounded-md ${
                    pagination.page === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      pagination.page === page
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`px-3 py-1 rounded-md ${
                    pagination.page === pagination.totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
} 