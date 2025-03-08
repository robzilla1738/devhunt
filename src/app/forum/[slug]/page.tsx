import { notFound } from 'next/navigation';
import { getForumPostBySlug } from '@/lib/api';
import ForumPostDetail from '@/components/forum/ForumPostDetail';

interface ForumPostPageProps {
  params: {
    slug: string;
  };
}

export default async function ForumPostPage({ params }: ForumPostPageProps) {
  const { slug } = params;
  const postData = await getForumPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  // Transform dates to strings for client component
  const post = {
    ...postData,
    createdAt: postData.createdAt.toISOString(),
    updatedAt: postData.updatedAt.toISOString(),
    forumComments: postData.forumComments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs navigation */}
        <div className="mb-6 text-sm text-gray-500">
          <a href="/forum" className="hover:text-primary-600 transition-colors">
            Forum
          </a>
          <span className="mx-2">/</span>
          <a 
            href={`/forum?category=${post.category.id}`} 
            className="hover:text-primary-600 transition-colors"
          >
            {post.category.name}
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{post.title}</span>
        </div>
        
        <ForumPostDetail post={post} />

        {/* Back button */}
        <div className="mt-8 text-center">
          <a 
            href="/forum" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Forum
          </a>
        </div>
      </div>
    </div>
  );
} 