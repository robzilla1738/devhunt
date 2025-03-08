import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

// In-memory storage for mock comments
const mockComments = new Map<string, Array<any>>();

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to comment' },
        { status: 401 }
      );
    }

    const { slug } = params;
    const { content } = await request.json();

    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Comment content cannot be empty' },
        { status: 400 }
      );
    }

    // Find the post by slug
    const post = await prisma.forumPost.findUnique({
      where: { slug },
    });

    // Handle mock data if post is not in database
    if (!post) {
      // Create a mock comment
      const mockPostKey = `mock-post-${slug}`;
      
      // Initialize comments array if it doesn't exist
      if (!mockComments.has(mockPostKey)) {
        mockComments.set(mockPostKey, []);
      }
      
      const commentId = `mock-comment-${Date.now()}`;
      const now = new Date();
      
      const newComment = {
        id: commentId,
        content,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        user: {
          id: session.user.email,
          name: session.user.name,
          image: session.user.image,
        }
      };
      
      // Add to mock comments
      mockComments.get(mockPostKey)!.push(newComment);
      
      return NextResponse.json(newComment);
    }

    // Continue with real database operations
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

    // Create the comment
    const comment = await prisma.forumComment.create({
      data: {
        content,
        forumPost: { connect: { id: post.id } },
        user: { connect: { id: user.id } },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating forum comment:', error);
    return NextResponse.json(
      { error: 'Failed to create forum comment' },
      { status: 500 }
    );
  }
}

// Add a GET handler to retrieve comments
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Check if this is a mock post
    const mockPostKey = `mock-post-${slug}`;
    const mockPostComments = mockComments.get(mockPostKey) || [];
    
    // Return mock comments
    return NextResponse.json(mockPostComments);
  } catch (error) {
    console.error('Error fetching forum comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forum comments' },
      { status: 500 }
    );
  }
} 