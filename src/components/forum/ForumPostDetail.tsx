'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

interface User {
  id: string;
  name: string | null;
  image: string | null;
  bio?: string | null;
}

interface Category {
  id: string;
  name: string;
}

interface ForumComment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

interface ForumPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  category: Category;
  forumComments: ForumComment[];
  _count: {
    forumVotes: number;
    forumComments: number;
  };
}

interface ForumPostDetailProps {
  post: ForumPost;
}

export default function ForumPostDetail({ post }: ForumPostDetailProps) {
  const { data: session } = useSession();
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(post._count.forumVotes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<ForumComment[]>(post.forumComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formattedDate = format(new Date(post.createdAt), 'MMM d, yyyy');
  const isMockPost = post.id.startsWith('post-');

  // Load any new comments that were added (for mock posts)
  useEffect(() => {
    if (isMockPost) {
      const loadMockComments = async () => {
        try {
          const response = await fetch(`/api/forum/${post.slug}/comments`);
          if (response.ok) {
            const newComments = await response.json();
            if (newComments && newComments.length > 0) {
              // Combine with existing comments, avoiding duplicates
              const existingIds = new Set(comments.map(c => c.id));
              const filteredNewComments = newComments.filter((c: any) => !existingIds.has(c.id));
              
              if (filteredNewComments.length > 0) {
                setComments(prev => [...filteredNewComments, ...prev]);
              }
            }
          }
        } catch (error) {
          console.error('Error loading mock comments:', error);
        }
      };
      
      loadMockComments();
    }
  }, [post.slug, isMockPost, comments]);

  // Check if user has voted on this post
  useEffect(() => {
    if (session?.user) {
      fetch(`/api/forum/${post.slug}/voted`)
        .then(res => res.json())
        .then(data => {
          if (data.voted !== undefined) {
            setVoted(data.voted);
          }
        })
        .catch(error => {
          console.error('Error checking vote status:', error);
        });
    }
  }, [post.slug, session]);

  const handleVote = async () => {
    if (!session?.user) {
      window.location.href = '/auth/signin';
      return;
    }

    try {
      const response = await fetch(`/api/forum/${post.slug}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to vote on post');
      }

      const data = await response.json();
      setVoted(data.voted);
      setVoteCount(data.voteCount);
    } catch (error) {
      console.error('Error voting on post:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      window.location.href = '/auth/signin';
      return;
    }

    if (!comment.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/forum/${post.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const newComment = await response.json();
      setComments(prevComments => [newComment, ...prevComments]);
      setComment('');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred while posting your comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        {/* Post Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <a 
              href={`/forum?category=${post.category.id}`}
              className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors mb-3"
            >
              {post.category.name}
            </a>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                {post.user.image ? (
                  <img 
                    src={post.user.image} 
                    alt={post.user.name || 'User'} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold mr-2">
                    {post.user.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="text-gray-600">{post.user.name || 'Anonymous'}</span>
              </div>
              <span className="text-gray-500">Posted on {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="prose max-w-none mt-6 text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </div>

        {/* Post Actions */}
        <div className="mt-8 flex items-center space-x-6 border-t border-gray-100 pt-4">
          <button 
            onClick={handleVote}
            className={`flex items-center space-x-2 ${voted ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill={voted ? 'currentColor' : 'none'} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={voted ? 0 : 1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{voteCount} votes</span>
          </button>
          <div className="flex items-center space-x-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>{comments.length} comments</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Comments</h2>

        {/* Comment Form */}
        {session?.user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
              ></textarea>
              {errorMessage && (
                <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
            <p className="text-gray-600 mb-2">You need to be signed in to comment.</p>
            <a 
              href="/auth/signin" 
              className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign In
            </a>
          </div>
        )}

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start">
                  <div className="shrink-0 mr-4">
                    {comment.user.image ? (
                      <img 
                        src={comment.user.image} 
                        alt={comment.user.name || 'User'} 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold">
                        {comment.user.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">{comment.user.name || 'Anonymous'}</h3>
                      <span className="text-sm text-gray-500">
                        {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <div dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
} 