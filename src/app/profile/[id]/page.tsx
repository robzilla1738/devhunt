import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  return {
    title: `${user.name}'s Profile | DevHunt`,
    description: `View ${user.name}'s projects and contributions on DevHunt`,
  };
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  // Get user's projects
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { 
      votes: true,
    },
  });

  // Get user's forum posts
  const forumPosts = await prisma.forumPost.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      forumVotes: true,
      forumComments: {
        select: { id: true },
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 sm:p-8 bg-gray-50 border-b">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-primary-100 text-primary-600 text-xl font-bold">
                  {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user.name || 'Anonymous User'}</h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 sm:px-8 py-4 border-b">
          <div className="flex space-x-6">
            <button className="font-medium text-primary-600 border-b-2 border-primary-600 pb-3">Projects ({projects.length})</button>
            <button className="font-medium text-gray-500 hover:text-gray-700 pb-3">Forum Posts ({forumPosts.length})</button>
          </div>
        </div>

        {/* Projects List */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No projects yet.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link 
                  key={project.id} 
                  href={`/projects/${project.slug}`}
                  className="block bg-white rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{project.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span>⬆️ {project.votes.length}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.tagline}</p>
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded text-gray-600 capitalize">
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Forum Posts Section */}
          <h2 className="text-xl font-semibold mb-4 mt-12">Forum Posts</h2>
          
          {forumPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No forum posts yet.
            </div>
          ) : (
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/forum/${post.slug}`}
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <span>⬆️ {post.forumVotes.length}</span>
                      <span>💬 {post.forumComments.length}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.content}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 