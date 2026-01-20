import { NextRequest, NextResponse } from 'next/server';
import { getArticleById } from '@/data/articles';
import { formatPaymentRequired } from '@/lib/x402';

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

  // Check if article requires payment
  if (article.isPaid) {
    // Check for payment proof in headers
    const paymentProof = request.headers.get('X-Payment-Proof');

    if (!paymentProof) {
      // Return 402 Payment Required
      const paymentDetails = formatPaymentRequired(article.id);

      return NextResponse.json(
        {
          error: 'Payment Required',
          article: {
            id: article.id,
            title: article.title,
            subtitle: article.subtitle,
            previewContent: article.previewContent,
            author: article.author,
            publishedAt: article.publishedAt,
            readTime: article.readTime,
            coverImage: article.coverImage,
            tags: article.tags,
            isPaid: article.isPaid,
            price: article.price,
            claps: article.claps,
          },
          payment: paymentDetails.payment,
        },
        {
          status: 402,
          headers: paymentDetails.headers,
        }
      );
    }

    // In production, verify the payment proof here
    // For MVP, we trust the client-side verification
  }

  // Return full article
  return NextResponse.json(article);
}
