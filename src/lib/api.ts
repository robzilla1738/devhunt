import { prisma } from './prisma';

export async function getProjects({ 
  page = 1, 
  limit = 9, 
  status = 'all',
  sort = 'newest',
  search = ''
}: {
  page?: number;
  limit?: number;
  status?: 'all' | 'development' | 'beta' | 'launched';
  sort?: 'newest' | 'popular' | 'trending';
  search?: string;
}) {
  const skip = (page - 1) * limit;
  
  const where = {
    ...(status !== 'all' ? { status } : {}),
    ...(search ? { 
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { tagline: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {})
  };
  
  // Use different queries based on sort type to avoid type issues
  let projects;
  
  if (sort === 'popular') {
    projects = await prisma.project.findMany({
      where,
      orderBy: {
        votes: {
          _count: 'desc'
        }
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
            comments: true,
          },
        },
      },
    });
  } else if (sort === 'trending') {
    // For trending, we'll use a simpler approach - most recent votes
    projects = await prisma.project.findMany({
      where,
      orderBy: {
        votes: {
          _count: 'desc'
        }
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
            comments: true,
          },
        },
      },
    });
  } else {
    // Default: newest
    projects = await prisma.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
            comments: true,
          },
        },
      },
    });
  }
  
  const total = await prisma.project.count({ where });
  
  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          votes: true,
        },
      },
    },
  });
}

export async function getForumPosts({
  page = 1,
  limit = 10,
  categoryId = '',
  sort = 'newest',
  search = ''
}: {
  page?: number;
  limit?: number;
  categoryId?: string;
  sort?: 'newest' | 'popular' | 'active';
  search?: string;
}) {
  const skip = (page - 1) * limit;
  
  const where = {
    ...(categoryId ? { categoryId } : {}),
    ...(search ? { 
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {})
  };
  
  let posts;
  
  if (sort === 'popular') {
    posts = await prisma.forumPost.findMany({
      where,
      orderBy: {
        forumVotes: {
          _count: 'desc'
        }
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        _count: {
          select: {
            forumComments: true,
            forumVotes: true,
          },
        },
      },
    });
  } else if (sort === 'active') {
    posts = await prisma.forumPost.findMany({
      where,
      orderBy: {
        forumComments: {
          _count: 'desc'
        }
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        _count: {
          select: {
            forumComments: true,
            forumVotes: true,
          },
        },
      },
    });
  } else {
    // Default: newest
    posts = await prisma.forumPost.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        _count: {
          select: {
            forumComments: true,
            forumVotes: true,
          },
        },
      },
    });
  }
  
  const total = await prisma.forumPost.count({ where });
  
  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getNewsPosts({
  page = 1,
  limit = 5,
  search = ''
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const skip = (page - 1) * limit;
  
  const where = {
    ...(search ? { 
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {})
  };
  
  const posts = await prisma.newsPost.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
    include: {
      _count: {
        select: {
          newsComments: true,
          newsVotes: true,
        },
      },
    },
  });
  
  const total = await prisma.newsPost.count({ where });
  
  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getForumPostBySlug(slug: string) {
  // Try to find the post in the database
  const dbPost = await prisma.forumPost.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
        },
      },
      category: true,
      forumComments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          forumVotes: true,
          forumComments: true,
        },
      },
    },
  });

  // If found in database, return it
  if (dbPost) {
    return dbPost;
  }

  // If not found in database, check if it's one of our example posts
  // Mock data for examples
  const mockPosts = [
    {
      id: 'post-1',
      title: 'How to get started with React and TypeScript?',
      slug: 'how-to-get-started-with-react-and-typescript',
      content: 'I\'m new to both React and TypeScript and looking for resources to get started. I\'ve been a JavaScript developer for about 2 years now, mostly working with vanilla JS and a bit of jQuery. I want to level up my skills and learn React with TypeScript, but I\'m finding it a bit overwhelming to jump into both at the same time.\n\nCan anyone recommend some good resources, tutorials, or courses that specifically focus on React + TypeScript? I\'d prefer free resources if possible, but I\'m willing to pay for quality content if it\'s really worth it.\n\nAlso, what\'s your opinion on learning React first with JavaScript and then adding TypeScript later vs. learning both together from the start?',
      createdAt: new Date('2023-03-15'),
      updatedAt: new Date('2023-03-15'),
      userId: 'user-1',
      categoryId: 'cat-3',
      user: { 
        id: 'user-1', 
        name: 'React Beginner', 
        image: null,
        bio: 'JavaScript developer looking to learn React and TypeScript'
      },
      category: { 
        id: 'cat-3', 
        name: 'Technical Help',
        slug: 'help',
      },
      forumComments: [
        {
          id: 'comment-1',
          content: 'I would recommend the TypeScript course on the official React documentation. They have great examples!',
          createdAt: new Date('2023-03-15T10:30:00'),
          updatedAt: new Date('2023-03-15T10:30:00'),
          userId: 'user-2',
          forumPostId: 'post-1',
          user: {
            id: 'user-2',
            name: 'React Expert',
            image: null
          }
        },
        {
          id: 'comment-2',
          content: 'In my experience, it\'s better to learn React with JavaScript first, then add TypeScript. The learning curve is less steep that way.',
          createdAt: new Date('2023-03-15T11:45:00'),
          updatedAt: new Date('2023-03-15T11:45:00'),
          userId: 'user-3',
          forumPostId: 'post-1',
          user: {
            id: 'user-3',
            name: 'TypeScript Developer',
            image: null
          }
        }
      ],
      _count: {
        forumVotes: 8,
        forumComments: 2
      }
    },
    {
      id: 'post-2',
      title: 'Feedback on my new project management tool',
      slug: 'feedback-on-my-new-project-management-tool',
      content: 'I\'ve been working on a project management tool for developers for the past 6 months and I\'m finally ready to share it with the community for feedback.\n\nIt\'s called DevTracker and it\'s specifically designed for software teams using agile methodologies. Some key features include:\n\n- Customizable Kanban boards\n- Time tracking integrated with Git commits\n- Burndown charts and velocity metrics\n- Built-in daily standup tracking\n- Git integration for automatic status updates\n\nI\'d love to get your thoughts on the concept, features, and anything you think might be missing. I\'m especially interested in hearing from team leads and project managers about what pain points they have with existing tools.\n\nYou can check out the beta at [devtracker.example.com](https://devtracker.example.com) (use invite code DEVHUNT for access).',
      createdAt: new Date('2023-03-14'),
      updatedAt: new Date('2023-03-14'),
      userId: 'user-2',
      categoryId: 'cat-2',
      user: { 
        id: 'user-2', 
        name: 'DevTracker Creator', 
        image: null,
        bio: 'Full-stack developer working on developer tools'
      },
      category: { 
        id: 'cat-2', 
        name: 'Project Feedback',
        slug: 'feedback',
      },
      forumComments: [
        {
          id: 'comment-3',
          content: 'This looks really promising! I especially like the Git integration feature. One thing I would suggest adding is integration with CI/CD pipelines.',
          createdAt: new Date('2023-03-14T14:20:00'),
          updatedAt: new Date('2023-03-14T14:20:00'),
          userId: 'user-4',
          forumPostId: 'post-2',
          user: {
            id: 'user-4',
            name: 'Agile Coach',
            image: null
          }
        }
      ],
      _count: {
        forumVotes: 12,
        forumComments: 1
      }
    },
    {
      id: 'post-3',
      title: 'Introducing myself to the community',
      slug: 'introducing-myself-to-the-community',
      content: 'Hello everyone! I\'m new here and wanted to introduce myself. My name is Jamie and I\'m a backend developer with about 5 years of experience, primarily working with Node.js and Python.\n\nI recently started exploring frontend technologies as well, trying to become more of a full-stack developer. Currently learning React and having a lot of fun with it!\n\nI\'m joining this community because I\'m working on a side project (a tool for writers to track their writing habits and get AI-generated feedback) and I\'m looking for like-minded developers to share ideas with and potentially collaborate.\n\nLooking forward to being a part of this community and learning from all of you!',
      createdAt: new Date('2023-03-13'),
      updatedAt: new Date('2023-03-13'),
      userId: 'user-3',
      categoryId: 'cat-1',
      user: { 
        id: 'user-3', 
        name: 'Jamie', 
        image: null,
        bio: 'Backend developer exploring frontend technologies'
      },
      category: { 
        id: 'cat-1', 
        name: 'General Discussion',
        slug: 'general',
      },
      forumComments: [
        {
          id: 'comment-4',
          content: 'Welcome to the community, Jamie! Your AI writing tool sounds fascinating. Would love to hear more about it.',
          createdAt: new Date('2023-03-13T09:15:00'),
          updatedAt: new Date('2023-03-13T09:15:00'),
          userId: 'user-5',
          forumPostId: 'post-3',
          user: {
            id: 'user-5',
            name: 'Community Moderator',
            image: null
          }
        }
      ],
      _count: {
        forumVotes: 5,
        forumComments: 1
      }
    },
    {
      id: 'post-4',
      title: 'Looking for React developers for my startup',
      slug: 'looking-for-react-developers-for-my-startup',
      content: 'We\'re a small startup working on an exciting new product and looking for React developers to join our team. We\'re building a next-generation analytics platform for e-commerce businesses.\n\nWe\'re looking for developers with at least 2 years of experience with React and a good understanding of state management (Redux, Context API, etc.) and modern React patterns (hooks, custom hooks, etc.).\n\nThis is a remote position with competitive compensation. We\'re a globally distributed team, so we\'re open to candidates from any timezone, though some overlap with EST business hours is preferred.\n\nIf you\'re interested, please send your resume and a brief introduction to careers@example-startup.com with the subject line "DevHunt React Developer". Bonus points if you include a link to your GitHub profile or some code samples!',
      createdAt: new Date('2023-03-12'),
      updatedAt: new Date('2023-03-12'),
      userId: 'user-4',
      categoryId: 'cat-5',
      user: { 
        id: 'user-4', 
        name: 'Startup Founder', 
        image: null,
        bio: 'Founder of an e-commerce analytics startup'
      },
      category: { 
        id: 'cat-5', 
        name: 'Job Board',
        slug: 'jobs',
      },
      forumComments: [
        {
          id: 'comment-5',
          content: 'I\'m interested! What\'s the salary range for this position?',
          createdAt: new Date('2023-03-12T16:40:00'),
          updatedAt: new Date('2023-03-12T16:40:00'),
          userId: 'user-6',
          forumPostId: 'post-4',
          user: {
            id: 'user-6',
            name: 'React Developer',
            image: null
          }
        }
      ],
      _count: {
        forumVotes: 7,
        forumComments: 1
      }
    },
    {
      id: 'post-5',
      title: 'Showcase: My new open-source CSS framework',
      slug: 'showcase-my-new-open-source-css-framework',
      content: 'I\'m excited to share my new CSS framework that I\'ve been working on for the past year. It\'s called SimplifyCSS and it\'s designed to be lightweight, accessible, and easy to customize.\n\nKey features:\n\n- Only 5kb minified and gzipped\n- Built with CSS custom properties for easy theming\n- Fully accessible with proper ARIA support\n- No JavaScript dependencies\n- Compatible with all modern browsers (IE11 with polyfills)\n\nI built this because I found that most CSS frameworks are either too opinionated (making it hard to customize) or too bloated with features I never use.\n\nYou can check out the documentation and examples at [simplifycss.org](https://simplifycss.org) and the GitHub repo at [github.com/example/simplifycss](https://github.com/example/simplifycss).\n\nI\'d love to hear what you think and if you have any suggestions for improvements!',
      createdAt: new Date('2023-03-11'),
      updatedAt: new Date('2023-03-11'),
      userId: 'user-5',
      categoryId: 'cat-4',
      user: { 
        id: 'user-5', 
        name: 'CSS Enthusiast', 
        image: null,
        bio: 'Front-end developer specializing in CSS and accessibility'
      },
      category: { 
        id: 'cat-4', 
        name: 'Showcase',
        slug: 'showcase',
      },
      forumComments: [
        {
          id: 'comment-6',
          content: 'This looks great! I\'ve been looking for a lightweight CSS framework. Will definitely check it out.',
          createdAt: new Date('2023-03-11T10:10:00'),
          updatedAt: new Date('2023-03-11T10:10:00'),
          userId: 'user-7',
          forumPostId: 'post-5',
          user: {
            id: 'user-7',
            name: 'Web Designer',
            image: null
          }
        }
      ],
      _count: {
        forumVotes: 15,
        forumComments: 1
      }
    }
  ];

  // Find the matching mock post
  const mockPost = mockPosts.find(post => post.slug === slug);
  
  // Return the mock post if found, otherwise return null
  return mockPost || null;
} 