import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const city = url.searchParams.get('city');

  const res = await fetch(
    `${process.env.REALTIME_BASE_URL}?location=${city}&units=metric&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      // cache: 'force-cache',
    }
  );
  if (!res.ok) {
    throw new Error('API Error');
  }

  const data = await res.json();

  return NextResponse.json({ data });
}
