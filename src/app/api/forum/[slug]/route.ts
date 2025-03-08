import { NextRequest, NextResponse } from 'next/server';
import { getForumPostBySlug } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const post = await getForumPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Forum post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching forum post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forum post' },
      { status: 500 }
    );
  }
} 