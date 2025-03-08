import { NextRequest, NextResponse } from 'next/server';
import { getForumPosts } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const categoryId = searchParams.get('categoryId') || '';
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search') || '';

    const result = await getForumPosts({
      page,
      limit,
      categoryId,
      sort: sort as any,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forum posts' },
      { status: 500 }
    );
  }
} 