import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

// In-memory storage for mock votes (since we can't save to the database)
const mockVotes = new Map<string, Set<string>>();

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to vote' },
        { status: 401 }
      );
    }

    const { slug } = params;

    // Find the post by slug
    const post = await prisma.forumPost.findUnique({
      where: { slug },
    });

    // Handle mock data if not found in database
    if (!post) {
      // Create a unique key for this post
      const mockPostKey = `mock-post-${slug}`;
      
      // If no votes for this post yet, initialize an empty set
      if (!mockVotes.has(mockPostKey)) {
        mockVotes.set(mockPostKey, new Set());
      }
      
      const voters = mockVotes.get(mockPostKey)!;
      const userId = session.user.email as string;
      
      // Toggle vote
      if (voters.has(userId)) {
        voters.delete(userId);
        return NextResponse.json({ 
          voted: false, 
          voteCount: voters.size 
        });
      } else {
        voters.add(userId);
        return NextResponse.json({ 
          voted: true, 
          voteCount: voters.size 
        });
      }
    }

    // Continue with normal database operations for real posts
    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
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

    if (existingVote) {
      // If vote exists, remove it (toggle behavior)
      await prisma.forumVote.delete({
        where: {
          id: existingVote.id,
        },
      });

      // Get updated vote count
      const voteCount = await prisma.forumVote.count({
        where: { forumPostId: post.id }
      });

      return NextResponse.json({ 
        voted: false, 
        voteCount 
      });
    } else {
      // Create new vote
      await prisma.forumVote.create({
        data: {
          forumPost: { connect: { id: post.id } },
          user: { connect: { id: user.id } },
        },
      });

      // Get updated vote count
      const voteCount = await prisma.forumVote.count({
        where: { forumPostId: post.id }
      });

      return NextResponse.json({ 
        voted: true, 
        voteCount 
      });
    }
  } catch (error) {
    console.error('Error voting on forum post:', error);
    return NextResponse.json(
      { error: 'Failed to vote on forum post' },
      { status: 500 }
    );
  }
} 