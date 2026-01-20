import { NextRequest, NextResponse } from 'next/server';
import { getArticleById } from '@/data/articles';

// This route is protected by x402 middleware
// When payment is verified, this returns the full article content
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = getArticleById(params.id);

  if (!article) {
    return NextResponse.json(
      { error: 'Article not found' },
      { status: 404 }
    );
  }

  // If we reach here, payment has been verified by x402 middleware
  // Return the full article content
  return NextResponse.json({
    success: true,
    article: {
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      content: article.content,
      author: article.author,
      publishedAt: article.publishedAt,
      readTime: article.readTime,
      coverImage: article.coverImage,
      tags: article.tags,
      claps: article.claps,
    },
  });
}
