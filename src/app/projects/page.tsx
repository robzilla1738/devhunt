import ProjectsList from '@/components/projects/ProjectsList';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-600 mt-2">
          Discover and explore developer projects in various stages of development.
        </p>
      </div>

      <ProjectsList />
    </div>
  );
} 