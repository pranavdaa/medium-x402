import { NextResponse } from 'next/server';
import { articles } from '@/data/articles';

export async function GET() {
  return NextResponse.json(articles);
}
