import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/api';
import ProjectDetail from '@/components/projects/ProjectDetail';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const projectData = await getProjectBySlug(slug);

  if (!projectData) {
    notFound();
  }

  // Transform dates to strings for client component
  const project = {
    ...projectData,
    createdAt: projectData.createdAt.toISOString(),
    updatedAt: projectData.updatedAt.toISOString(),
    comments: projectData.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    })),
  };

  // Fetch related projects (same status, excluding current project)
  const relatedProjectsData = await getProjects({
    limit: 3,
    status: project.status as any,
    sort: 'newest',
  });

  // Format dates and filter out the current project
  const relatedProjects = relatedProjectsData.projects
    .filter(p => p.id !== project.id)
    .slice(0, 3)
    .map(p => ({
      ...p,
      createdAt: new Date(p.createdAt).toISOString(),
      updatedAt: new Date(p.updatedAt).toISOString()
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectDetail project={project} />

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProjects.map(relatedProject => (
              <a 
                href={`/projects/${relatedProject.slug}`} 
                key={relatedProject.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="relative h-40 bg-gray-100">
                  {relatedProject.thumbnail ? (
                    <img 
                      src={relatedProject.thumbnail} 
                      alt={relatedProject.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600">
                      <span className="text-white text-3xl font-bold">{relatedProject.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-80 text-white px-2 py-1 rounded-md text-xs">
                    {relatedProject.status}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {relatedProject.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2 h-10">
                    {relatedProject.tagline}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      {relatedProject.user.image ? (
                        <img 
                          src={relatedProject.user.image} 
                          alt={relatedProject.user.name || 'User'} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-600 text-xs">
                          {relatedProject.user.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <span className="text-sm text-gray-600">
                        {relatedProject.user.name || 'Anonymous'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {relatedProject._count.votes}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 