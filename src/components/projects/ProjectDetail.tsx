'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { FiArrowUp, FiLink, FiGithub, FiMessageSquare } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

interface User {
  id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  website: string | null;
  github: string | null;
  thumbnail: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  comments: Comment[];
  _count: {
    votes: number;
  };
}

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const { data: session } = useSession();
  const [isVoting, setIsVoting] = useState(false);
  const [voteCount, setVoteCount] = useState(project._count.votes);
  const [isVoted, setIsVoted] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>(project.comments || []);

  // Check if user has voted for this project
  useEffect(() => {
    const checkUserVote = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/projects/${project.slug}/user-vote`);
          
          if (response.ok) {
            const data = await response.json();
            setIsVoted(data.voted);
          }
        } catch (error) {
          console.error('Error checking user vote:', error);
        }
      }
    };

    checkUserVote();
  }, [session, project.slug]);

  const handleVote = async () => {
    if (!session) {
      // Redirect to login if not logged in
      window.location.href = `/auth/signin?callbackUrl=/projects/${project.slug}`;
      return;
    }

    setIsVoting(true);
    
    try {
      const response = await fetch(`/api/projects/${project.slug}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to vote');
      }

      const data = await response.json();
      
      if (data.voted) {
        setVoteCount((prev) => prev + 1);
        setIsVoted(true);
      } else {
        setVoteCount((prev) => prev - 1);
        setIsVoted(false);
      }
    } catch (error) {
      console.error('Error voting:', error);
      // Show an error toast or message
    } finally {
      setIsVoting(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      window.location.href = `/auth/signin?callbackUrl=/projects/${project.slug}`;
      return;
    }
    
    if (!commentContent.trim()) {
      return;
    }
    
    setIsSubmittingComment(true);
    
    try {
      const response = await fetch(`/api/projects/${project.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment = await response.json();
      
      setComments((prev) => [newComment, ...prev]);
      setCommentContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Show an error toast or message
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            <span className="text-gray-500 text-sm">
              Updated {formatDate(project.updatedAt)}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <p className="text-xl text-gray-700 mb-4">{project.tagline}</p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 relative overflow-hidden">
              {project.user.image && (
                <Image
                  src={project.user.image}
                  alt={project.user.name || 'User'}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <Link href={`/profile/${project.user.id}`} className="font-medium hover:text-primary-600">
                {project.user.name}
              </Link>
              <div className="text-sm text-gray-500">Project Creator</div>
            </div>
          </div>
        </div>

        {/* Project Image */}
        {project.thumbnail ? (
          <div className="mb-8 relative h-80 rounded-lg overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mb-8 bg-gray-200 h-80 rounded-lg"></div>
        )}

        {/* Project Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About this project</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>
              {project.description}
            </ReactMarkdown>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea 
              className="input w-full h-24 mb-2" 
              placeholder={session ? "Leave a comment..." : "Sign in to leave a comment"}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              disabled={!session || isSubmittingComment}
            ></textarea>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!session || isSubmittingComment || !commentContent.trim()}
            >
              {isSubmittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 relative overflow-hidden">
                      {comment.user.image && (
                        <Image
                          src={comment.user.image}
                          alt={comment.user.name || 'User'}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <Link href={`/profile/${comment.user.id}`} className="font-medium hover:text-primary-600">
                        {comment.user.name}
                      </Link>
                      <div className="text-sm text-gray-500">{formatDate(comment.createdAt)}</div>
                    </div>
                  </div>
                  <p className="whitespace-pre-line">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <div className="card sticky top-20">
          <div className="p-6">
            {/* Vote Button */}
            <button 
              className={`btn w-full mb-6 flex items-center justify-center ${
                isVoted ? 'bg-primary-700 text-white' : 'btn-outline'
              }`}
              onClick={handleVote}
              disabled={isVoting}
            >
              <FiArrowUp className="mr-2" />
              {isVoting ? 'Processing...' : `Upvote (${voteCount})`}
            </button>
            
            {/* Project Links */}
            <div className="space-y-4 mb-6">
              {project.website && (
                <a 
                  href={project.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 hover:text-primary-700"
                >
                  <FiLink className="mr-2" />
                  Visit Website
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 hover:text-primary-700"
                >
                  <FiGithub className="mr-2" />
                  GitHub Repository
                </a>
              )}
            </div>
            
            {/* Project Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">{formatDate(project.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Updated</span>
                <span className="font-medium">{formatDate(project.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 