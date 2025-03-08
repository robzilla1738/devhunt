import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface Params {
  params: {
    slug: string;
  };
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to vote' },
        { status: 401 }
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

    if (existingVote) {
      // If the user has already voted, remove the vote (toggle)
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      return NextResponse.json({
        message: 'Vote removed',
        voted: false,
      });
    }

    // Create a new vote
    await prisma.vote.create({
      data: {
        userId: session.user.id,
        projectId: project.id,
      },
    });

    return NextResponse.json({
      message: 'Vote added',
      voted: true,
    });
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
} 