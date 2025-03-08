'use client';

import Link from 'next/link';
import { getProjects } from '@/lib/api';

export default async function Home() {
  // Fetch featured projects (launched status, most popular)
  const featuredProjectsResult = await getProjects({
    limit: 3,
    status: 'launched',
    sort: 'popular',
  });

  // Fetch upcoming projects (beta status)
  const upcomingProjectsResult = await getProjects({
    limit: 3,
    status: 'beta',
    sort: 'newest',
  });

  // Format data for display
  const featuredProjects = featuredProjectsResult.projects.map(project => ({
    ...project,
    createdAt: new Date(project.createdAt).toISOString(),
    updatedAt: new Date(project.updatedAt).toISOString()
  }));

  const upcomingProjects = upcomingProjectsResult.projects.map(project => ({
    ...project,
    createdAt: new Date(project.createdAt).toISOString(),
    updatedAt: new Date(project.updatedAt).toISOString()
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Developer Projects in Progress
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A community for developers to share and discover projects that are still in development.
            Get feedback, find collaborators, and showcase your work.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/projects" 
              className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 text-lg"
            >
              Explore Projects
            </a>
            <a 
              href="/auth/signin" 
              className="btn bg-primary-700 text-white border border-white hover:bg-primary-800 px-6 py-3 text-lg"
            >
              Join the Community
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <a href="/projects" className="flex items-center text-primary-600 hover:text-primary-700">
              View all
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <a 
                  href={`/projects/${project.slug}`} 
                  key={project.id} 
                  className="card hover:shadow-lg transition-shadow block"
                >
                  <div className="h-48 bg-gray-200 relative">
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
                    <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary-600">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {project.user.image ? (
                          <img 
                            src={project.user.image} 
                            alt={project.user.name || "Developer"} 
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-sm font-bold">
                              {project.user.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        )}
                        <span className="ml-2 text-sm text-gray-700">{project.user.name || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{project._count.votes} upvotes</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800">No featured projects yet</h3>
                <p className="text-gray-600 mt-2">Check back soon for featured projects</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Upcoming Projects</h2>
            <a href="/upcoming" className="flex items-center text-primary-600 hover:text-primary-700">
              View all
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingProjects.length > 0 ? (
              upcomingProjects.map((project) => (
                <a 
                  href={`/projects/${project.slug}`} 
                  key={project.id} 
                  className="card hover:shadow-lg transition-shadow block"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {project.thumbnail ? (
                      <img 
                        src={project.thumbnail} 
                        alt={project.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-500 to-secondary-600">
                        <span className="text-white text-3xl font-bold">{project.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-secondary-600 text-white text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary-600">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {project.user.image ? (
                          <img 
                            src={project.user.image} 
                            alt={project.user.name || "Developer"} 
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-sm font-bold">
                              {project.user.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        )}
                        <span className="ml-2 text-sm text-gray-700">{project.user.name || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>Coming soon</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800">No upcoming projects yet</h3>
                <p className="text-gray-600 mt-2">Check back soon for upcoming projects</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Forum Highlights Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Forum Highlights</h2>
            <a href="/forum" className="flex items-center text-primary-600 hover:text-primary-700">
              Visit Forum
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Forum post cards would be dynamically generated here */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Forum Post Title {i}</h3>
                      <div className="text-sm text-gray-500">Posted by Developer Name • 2 days ago</div>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      Category Name
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A preview of the forum post content that gives an idea of what the discussion is about.
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>{i * 5} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of developers and showcase your work-in-progress projects.
            Get valuable feedback and connect with potential collaborators.
          </p>
          <a 
            href="/auth/signin" 
            className="btn bg-white text-secondary-700 hover:bg-gray-100 px-6 py-3 text-lg inline-block"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  );
} 