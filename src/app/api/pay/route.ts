import { NextRequest, NextResponse } from 'next/server';
import { getArticleById } from '@/data/articles';
import { verifyPayment } from '@/lib/x402';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleId, txHash, userAddress } = body;

    // Validate required fields
    if (!articleId || !txHash || !userAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: articleId, txHash, userAddress' },
        { status: 400 }
      );
    }

    // Check article exists
    const article = getArticleById(articleId);
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Verify payment (simplified for MVP)
    const isValid = await verifyPayment(txHash, articleId);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Return success with full article content
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      article: article,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
