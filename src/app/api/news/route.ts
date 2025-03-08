import { NextRequest, NextResponse } from 'next/server';
import { getNewsPosts } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const search = searchParams.get('search') || '';

    const result = await getNewsPosts({
      page,
      limit,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news posts' },
      { status: 500 }
    );
  }
} 