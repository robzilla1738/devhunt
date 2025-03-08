import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Create test users
  const password = await hash('password123', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password,
      bio: 'Full-stack developer passionate about React and Node.js.',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password,
      bio: 'Mobile developer with experience in React Native and Flutter.',
    },
  });

  console.log(`Created users: ${user1.name}, ${user2.name}`);

  // Create forum categories
  const categories = [
    { name: 'General Discussion', slug: 'general', description: 'General topics related to development' },
    { name: 'Project Feedback', slug: 'feedback', description: 'Get feedback on your projects' },
    { name: 'Technical Help', slug: 'help', description: 'Ask for technical assistance' },
    { name: 'Showcase', slug: 'showcase', description: 'Show off your projects' },
    { name: 'Job Board', slug: 'jobs', description: 'Find developers or get hired' },
  ];

  for (const category of categories) {
    await prisma.forumCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log(`Created ${categories.length} forum categories`);

  // Create projects
  const projects = [
    {
      name: 'CodeCraft',
      slug: 'code-craft',
      description: 'A modern IDE with AI-powered code suggestions and real-time collaboration features. Built with Electron, React, and Node.js.',
      tagline: 'AI-powered code editor with collaboration features',
      status: 'development',
      userId: user1.id,
    },
    {
      name: 'TaskFlow',
      slug: 'task-flow',
      description: 'A project management tool designed specifically for software development teams. Features include kanban boards, time tracking, and Git integration.',
      tagline: 'Project management tool for developers',
      status: 'beta',
      userId: user2.id,
    },
    {
      name: 'ApiHub',
      slug: 'api-hub',
      description: 'A platform for discovering, testing, and documenting APIs. Includes features like request builders, response validators, and API monitoring.',
      tagline: 'Discover, test, and document APIs',
      status: 'development',
      userId: user1.id,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log(`Created ${projects.length} projects`);

  // Create forum posts
  const forumPosts = [
    {
      title: 'What\'s your preferred tech stack for side projects?',
      slug: 'preferred-tech-stack-side-projects',
      content: 'I\'m curious what tech stacks you all prefer for your side projects? I\'m trying to decide what to use for my next project and would love some input.',
      userId: user1.id,
      categoryId: (await prisma.forumCategory.findUnique({ where: { slug: 'general' } }))!.id,
    },
    {
      title: 'Need feedback on my new project management tool',
      slug: 'feedback-project-management-tool',
      content: 'I\'ve been working on a project management tool specifically for developers. I\'d love to get some feedback on the features and UI.',
      userId: user2.id,
      categoryId: (await prisma.forumCategory.findUnique({ where: { slug: 'feedback' } }))!.id,
    },
  ];

  for (const post of forumPosts) {
    await prisma.forumPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`Created ${forumPosts.length} forum posts`);

  // Create news posts
  const newsPosts = [
    {
      title: 'DevHunt Launches Beta Version',
      slug: 'devhunt-launches-beta',
      content: 'Today we\'re excited to announce the beta launch of DevHunt, a platform for developers to share and discover projects that are still in development.',
    },
    {
      title: 'The Importance of Early Feedback for Developers',
      slug: 'importance-early-feedback',
      content: 'Getting early feedback on your projects can be crucial for success. In this post, we explore why feedback matters and how to make the most of it.',
    },
  ];

  for (const post of newsPosts) {
    await prisma.newsPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`Created ${newsPosts.length} news posts`);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 