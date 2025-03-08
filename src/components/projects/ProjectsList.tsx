'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

interface ProjectsListProps {
  initialPage?: number;
  initialLimit?: number;
  initialStatus?: string;
  initialSort?: string;
  initialSearch?: string;
}

export default function ProjectsList({
  initialPage = 1,
  initialLimit = 9,
  initialStatus = 'all',
  initialSort = 'newest',
  initialSearch = '',
}: ProjectsListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    status: initialStatus,
    sort: initialSort,
    search: initialSearch,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filters.status,
        sort: filters.sort,
        search: filters.search,
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

  useEffect(() => {
    fetchProjects();
  }, [pagination.page, filters]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on filter change
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already in the filters state, so we just need to trigger a refetch
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="text-sm font-medium">Status:</label>
          <select 
            id="status" 
            className="input py-1 px-3"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All</option>
            <option value="development">Development</option>
            <option value="beta">Beta</option>
            <option value="launched">Launched</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
          <select 
            id="sort" 
            className="input py-1 px-3"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <label htmlFor="search" className="text-sm font-medium">Search:</label>
          <input 
            type="text" 
            id="search" 
            placeholder="Search projects..." 
            className="input py-1 px-3"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <button type="submit" className="btn btn-primary py-1">Search</button>
        </form>
      </div>

      {/* Status Messages */}
      {loading && <div className="text-center py-8">Loading projects...</div>}
      {error && <div className="text-center py-8 text-red-600">{error}</div>}
      
      {/* Projects Grid */}
      {!loading && !error && (
        <>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold">No projects found</h3>
              <p className="text-gray-600 mt-2">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="card hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link href={`/projects/${project.slug}`} className="hover:text-primary-600">
                        {project.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 relative overflow-hidden">
                          {project.user.image && (
                            <Image
                              src={project.user.image}
                              alt={project.user.name || 'User'}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="text-sm text-gray-700">{project.user.name}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{project._count.votes} upvotes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button 
                  onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      pagination.page === i + 1
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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