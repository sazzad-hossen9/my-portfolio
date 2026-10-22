import { NextResponse } from 'next/server';
import { getLocalDbData } from '@/lib/data';

export async function GET() {
  try {
    const data = getLocalDbData();
    return NextResponse.json(data.profile, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
