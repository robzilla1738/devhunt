import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ voted: false });
    }

    const { slug } = params;

    // Find the post by slug
    const post = await prisma.forumPost.findUnique({
      where: { slug },
    });

    // If post is not found in the database, we'll assume it's a mock post
    // For mock posts, we'll just return false (user hasn't voted)
    if (!post) {
      return NextResponse.json({ voted: false });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json({ voted: false });
    }

    // Check if the user has already voted
    const existingVote = await prisma.forumVote.findUnique({
      where: {
        userId_forumPostId: {
          userId: user.id,
          forumPostId: post.id,
        },
      },
    });

    return NextResponse.json({
      voted: !!existingVote,
    });
  } catch (error) {
    console.error('Error checking vote status:', error);
    return NextResponse.json(
      { error: 'Failed to check vote status' },
      { status: 500 }
    );
  }
} 