'use client';

import { useState } from 'react';
import CreateForumPostForm from '@/components/forum/CreateForumPostForm';

export default function ForumPage() {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  
  // In a real app, we would fetch categories and posts from the database
  const categories = [
    { id: 'cat-1', name: 'General Discussion', slug: 'general', count: 42 },
    { id: 'cat-2', name: 'Project Feedback', slug: 'feedback', count: 28 },
    { id: 'cat-3', name: 'Technical Help', slug: 'help', count: 35 },
    { id: 'cat-4', name: 'Showcase', slug: 'showcase', count: 19 },
    { id: 'cat-5', name: 'Job Board', slug: 'jobs', count: 12 },
  ];

  const posts = [
    {
      id: 'post-1',
      title: 'How to get started with React and TypeScript?',
      slug: 'how-to-get-started-with-react-and-typescript',
      excerpt: 'I\'m new to both React and TypeScript and looking for resources to get started...',
      content: 'I\'m new to both React and TypeScript and looking for resources to get started. I\'ve been a JavaScript developer for about 2 years now, mostly working with vanilla JS and a bit of jQuery. I want to level up my skills and learn React with TypeScript, but I\'m finding it a bit overwhelming to jump into both at the same time.\n\nCan anyone recommend some good resources, tutorials, or courses that specifically focus on React + TypeScript? I\'d prefer free resources if possible, but I\'m willing to pay for quality content if it\'s really worth it.\n\nAlso, what\'s your opinion on learning React first with JavaScript and then adding TypeScript later vs. learning both together from the start?',
      createdAt: '2023-03-15',
      commentCount: 8,
      category: { id: 'cat-3', name: 'Technical Help' },
      user: { id: 'user-1', name: 'React Beginner', image: null },
    },
    {
      id: 'post-2',
      title: 'Feedback on my new project management tool',
      slug: 'feedback-on-my-new-project-management-tool',
      excerpt: 'I\'ve been working on a project management tool for developers and would love some feedback...',
      content: 'I\'ve been working on a project management tool for developers for the past 6 months and I\'m finally ready to share it with the community for feedback.\n\nIt\'s called DevTracker and it\'s specifically designed for software teams using agile methodologies. Some key features include:\n\n- Customizable Kanban boards\n- Time tracking integrated with Git commits\n- Burndown charts and velocity metrics\n- Built-in daily standup tracking\n- Git integration for automatic status updates\n\nI\'d love to get your thoughts on the concept, features, and anything you think might be missing. I\'m especially interested in hearing from team leads and project managers about what pain points they have with existing tools.\n\nYou can check out the beta at [devtracker.example.com](https://devtracker.example.com) (use invite code DEVHUNT for access).',
      createdAt: '2023-03-14',
      commentCount: 12,
      category: { id: 'cat-2', name: 'Project Feedback' },
      user: { id: 'user-2', name: 'DevTracker Creator', image: null },
    },
    {
      id: 'post-3',
      title: 'Introducing myself to the community',
      slug: 'introducing-myself-to-the-community',
      excerpt: 'Hello everyone! I\'m new here and wanted to introduce myself...',
      content: 'Hello everyone! I\'m new here and wanted to introduce myself. My name is Jamie and I\'m a backend developer with about 5 years of experience, primarily working with Node.js and Python.\n\nI recently started exploring frontend technologies as well, trying to become more of a full-stack developer. Currently learning React and having a lot of fun with it!\n\nI\'m joining this community because I\'m working on a side project (a tool for writers to track their writing habits and get AI-generated feedback) and I\'m looking for like-minded developers to share ideas with and potentially collaborate.\n\nLooking forward to being a part of this community and learning from all of you!',
      createdAt: '2023-03-13',
      commentCount: 5,
      category: { id: 'cat-1', name: 'General Discussion' },
      user: { id: 'user-3', name: 'Jamie', image: null },
    },
    {
      id: 'post-4',
      title: 'Looking for React developers for my startup',
      slug: 'looking-for-react-developers-for-my-startup',
      excerpt: 'We\'re a small startup working on an exciting new product and looking for React developers...',
      content: 'We\'re a small startup working on an exciting new product and looking for React developers to join our team. We\'re building a next-generation analytics platform for e-commerce businesses.\n\nWe\'re looking for developers with at least 2 years of experience with React and a good understanding of state management (Redux, Context API, etc.) and modern React patterns (hooks, custom hooks, etc.).\n\nThis is a remote position with competitive compensation. We\'re a globally distributed team, so we\'re open to candidates from any timezone, though some overlap with EST business hours is preferred.\n\nIf you\'re interested, please send your resume and a brief introduction to careers@example-startup.com with the subject line "DevHunt React Developer". Bonus points if you include a link to your GitHub profile or some code samples!',
      createdAt: '2023-03-12',
      commentCount: 7,
      category: { id: 'cat-5', name: 'Job Board' },
      user: { id: 'user-4', name: 'Startup Founder', image: null },
    },
    {
      id: 'post-5',
      title: 'Showcase: My new open-source CSS framework',
      slug: 'showcase-my-new-open-source-css-framework',
      excerpt: 'I\'m excited to share my new CSS framework that I\'ve been working on for the past year...',
      content: 'I\'m excited to share my new CSS framework that I\'ve been working on for the past year. It\'s called SimplifyCSS and it\'s designed to be lightweight, accessible, and easy to customize.\n\nKey features:\n\n- Only 5kb minified and gzipped\n- Built with CSS custom properties for easy theming\n- Fully accessible with proper ARIA support\n- No JavaScript dependencies\n- Compatible with all modern browsers (IE11 with polyfills)\n\nI built this because I found that most CSS frameworks are either too opinionated (making it hard to customize) or too bloated with features I never use.\n\nYou can check out the documentation and examples at [simplifycss.org](https://simplifycss.org) and the GitHub repo at [github.com/example/simplifycss](https://github.com/example/simplifycss).\n\nI\'d love to hear what you think and if you have any suggestions for improvements!',
      createdAt: '2023-03-11',
      commentCount: 15,
      category: { id: 'cat-4', name: 'Showcase' },
      user: { id: 'user-5', name: 'CSS Enthusiast', image: null },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Developer Forum</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A place to ask questions, share your projects, and connect with other developers.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Create Post Button */}
          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={() => setShowCreatePostModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create New Post
            </button>
          </div>

          {/* Sidebar with Categories */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="space-y-1">
                  <ul>
                    <li>
                      <a 
                        href="/forum"
                        className="block px-3 py-2 rounded-md hover:bg-gray-100 text-primary-600 font-medium"
                      >
                        All Categories
                      </a>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <a 
                          href={`/forum?category=${category.id}`}
                          className="block px-3 py-2 rounded-md hover:bg-gray-100 flex justify-between items-center"
                        >
                          <span>{category.name}</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                            {category.count}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with Posts */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
                <select 
                  id="sort" 
                  className="input py-1 px-3"
                  defaultValue="newest"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="active">Most Active</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="search" className="text-sm font-medium">Search:</label>
                <input 
                  type="text" 
                  id="search" 
                  placeholder="Search discussions..." 
                  className="input py-1 px-3"
                />
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="card hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">
                        <a href={`/forum/${post.slug}`} className="hover:text-primary-600">
                          {post.title}
                        </a>
                      </h3>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {post.category.name}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                        <span className="text-gray-700">{post.user.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">{post.createdAt}</span>
                        <span className="text-gray-600">{post.commentCount} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full">
            <CreateForumPostForm 
              categories={categories} 
              onClose={() => setShowCreatePostModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
} 