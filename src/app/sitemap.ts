import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment or fallback
  const baseUrl = process.env.APP_URL || 'https://yourdomain.com';
  
  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forum`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upcoming`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  // Get dynamic project routes
  try {
    const projects = await prisma.project.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      where: {
        status: { not: 'draft' },
      },
    });

    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // Get dynamic forum posts
    const forumPosts = await prisma.forumPost.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const forumRoutes = forumPosts.map((post) => ({
      url: `${baseUrl}/forum/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...routes, ...projectRoutes, ...forumRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
} 