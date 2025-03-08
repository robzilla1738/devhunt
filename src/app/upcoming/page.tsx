import { getProjects } from '@/lib/api';
import ViewToggle from '@/components/projects/ViewToggle';

export default async function UpcomingPage() {
  // Fetch projects with status 'beta' from the API
  const result = await getProjects({
    limit: 18, // Increase limit for better calendar display
    page: 1,
    status: 'beta',
    sort: 'newest',
  });

  // Format dates in the project data for proper display
  const projectsWithFormattedDates = result.projects.map(project => ({
    ...project,
    createdAt: new Date(project.createdAt).toISOString(),
    updatedAt: new Date(project.updatedAt).toISOString()
  }));

  return (
    <div className="px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full">
          <span className="text-sm font-medium text-primary-700">Track Upcoming Launches</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Upcoming Projects
        </h1>
        <p className="text-xl text-gray-600">
          Discover projects launching soon and be the first to try them out.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mb-16">
        <ViewToggle 
          initialProjects={projectsWithFormattedDates} 
          initialPagination={result.pagination}
        />
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center px-4 py-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Have a project to showcase?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
          Submit your project to DevHunt and get feedback from fellow developers.
        </p>
        <a
          href="/submit"
          className="inline-block px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          Add Your Project
        </a>
      </div>
    </div>
  );
} 