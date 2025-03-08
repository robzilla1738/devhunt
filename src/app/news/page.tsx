export default function NewsPage() {
  // In a real app, we would fetch news posts from the database
  const newsPosts = [
    {
      id: 'news-1',
      title: 'Introducing DevHunt: A Platform for Developers to Share Their Projects',
      slug: 'introducing-devhunt',
      excerpt: 'Today we\'re excited to announce the launch of DevHunt, a platform designed specifically for developers to share and discover projects that are still in development...',
      thumbnail: null,
      createdAt: '2023-03-15',
      commentCount: 12,
    },
    {
      id: 'news-2',
      title: 'The Importance of Getting Early Feedback on Your Projects',
      slug: 'importance-of-early-feedback',
      excerpt: 'One of the most valuable aspects of sharing your work-in-progress projects is the opportunity to receive feedback from other developers...',
      thumbnail: null,
      createdAt: '2023-03-10',
      commentCount: 8,
    },
    {
      id: 'news-3',
      title: 'How to Write a Great Project Description',
      slug: 'how-to-write-project-description',
      excerpt: 'Your project description is often the first thing people see when they discover your work. A well-written description can make the difference between someone taking interest in your project or scrolling past it...',
      thumbnail: null,
      createdAt: '2023-03-05',
      commentCount: 5,
    },
    {
      id: 'news-4',
      title: 'Upcoming Features: What\'s Next for DevHunt',
      slug: 'upcoming-features',
      excerpt: 'We\'ve been listening to your feedback and working hard on new features to improve the DevHunt experience. Here\'s a preview of what\'s coming in the next few months...',
      thumbnail: null,
      createdAt: '2023-03-01',
      commentCount: 15,
    },
    {
      id: 'news-5',
      title: 'Developer Spotlight: Meet the Creators Behind Popular Projects',
      slug: 'developer-spotlight',
      excerpt: 'In this new series, we\'ll be interviewing the developers behind some of the most popular projects on DevHunt. Learn about their inspiration, challenges, and future plans...',
      thumbnail: null,
      createdAt: '2023-02-25',
      commentCount: 7,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">News & Updates</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-sm font-medium">Search:</label>
          <input 
            type="text" 
            id="search" 
            placeholder="Search news..." 
            className="input py-1 px-3"
          />
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="card overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <a href={`/news/${newsPosts[0].slug}`} className="hover:text-primary-600">
                  {newsPosts[0].title}
                </a>
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                {newsPosts[0].excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{newsPosts[0].createdAt}</span>
                <span className="mx-2">•</span>
                <span>{newsPosts[0].commentCount} comments</span>
              </div>
              <a 
                href={`/news/${newsPosts[0].slug}`} 
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
            <div className="md:w-1/3 bg-gray-200 md:h-auto h-48"></div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsPosts.slice(1).map((post) => (
          <div key={post.id} className="card hover:shadow-lg transition-shadow overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href={`/news/${post.slug}`} className="hover:text-primary-600">
                  {post.title}
                </a>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.createdAt}</span>
                <span>{post.commentCount} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <a href="#" className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            Previous
          </a>
          <a href="#" className="px-3 py-1 rounded border border-gray-300 bg-primary-600 text-white">
            1
          </a>
          <a href="#" className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            2
          </a>
          <a href="#" className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            3
          </a>
          <span className="px-3 py-1 text-gray-600">...</span>
          <a href="#" className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            5
          </a>
          <a href="#" className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            Next
          </a>
        </nav>
      </div>
    </div>
  );
} 