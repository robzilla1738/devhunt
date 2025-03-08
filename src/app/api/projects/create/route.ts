import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// Define validation schema
const projectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  tagline: z.string().min(5, 'Tagline must be at least 5 characters').max(100, 'Tagline must be at most 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  status: z.enum(['development', 'beta', 'launched']),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to create a project' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data', errors: result.error.errors },
        { status: 400 }
      );
    }

    const { name, tagline, description, website, github, status } = result.data;

    // Generate a slug from the name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);

    // Check if the slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    // If the slug exists, append a random string
    let finalSlug = slug;
    if (existingProject) {
      finalSlug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }

    // Create the project
    const project = await prisma.project.create({
      data: {
        name,
        slug: finalSlug,
        tagline,
        description,
        website: website || null,
        github: github || null,
        status,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: 'Project created successfully', slug: project.slug },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 