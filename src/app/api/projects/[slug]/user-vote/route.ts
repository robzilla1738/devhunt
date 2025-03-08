import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { voted: false },
        { status: 200 }
      );
    }

    const { slug } = params;
    
    // Find the project
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if the user has already voted
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        projectId: project.id,
      },
    });

    return NextResponse.json({ voted: !!existingVote });
  } catch (error) {
    console.error('Error checking user vote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 