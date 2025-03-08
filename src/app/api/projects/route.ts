import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const status = searchParams.get('status') || 'all';
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search') || '';

    const result = await getProjects({
      page,
      limit,
      status: status as any,
      sort: sort as any,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 