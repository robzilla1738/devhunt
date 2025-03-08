'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    website: '',
    github: '',
    status: 'development',
  });

  // Redirect if not logged in
  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=/projects/new');
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      // Redirect to the project page
      router.push(`/projects/${data.slug}`);
    } catch (error) {
      console.error('Error creating project:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add Your Project</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="input w-full"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
              Tagline *
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              required
              placeholder="A short, catchy description of your project"
              className="input w-full"
              value={formData.tagline}
              onChange={handleInputChange}
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              Max 100 characters ({formData.tagline.length}/100)
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              required
              placeholder="Describe your project in detail. What problem does it solve? What technologies are you using?"
              className="input w-full"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Markdown formatting is supported
            </p>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://yourproject.com"
              className="input w-full"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Repository
            </label>
            <input
              type="url"
              id="github"
              name="github"
              placeholder="https://github.com/username/repo"
              className="input w-full"
              value={formData.github}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Project Status *
            </label>
            <select
              id="status"
              name="status"
              required
              className="input w-full"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="development">In Development</option>
              <option value="beta">Beta</option>
              <option value="launched">Launched</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 