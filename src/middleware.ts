import { NextRequest, NextResponse } from 'next/server';

// Seller's wallet address (receives all payments)
const SELLER_WALLET = '0xad70845D9AE0B40CB68Cc289414Ea21b1Ce18BC8';

// USDC on Base Sepolia
const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';

// Article price
const PRICE_USD = '0.05';
const PRICE_USDC = '50000'; // 0.05 USDC in 6 decimals

// Protected routes and their prices
const PROTECTED_ROUTES: Record<string, { price: string; description: string }> = {
  '/api/articles/1/content': {
    price: PRICE_USD,
    description: 'Access to premium article: The Future of Micropayments',
  },
  '/api/articles/2/content': {
    price: PRICE_USD,
    description: 'Access to premium article: Getting Started with Base',
  },
  '/api/articles/4/content': {
    price: PRICE_USD,
    description: 'Access to premium article: Designing for Web3',
  },
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if this route requires payment
  const routeConfig = PROTECTED_ROUTES[path];
  if (!routeConfig) {
    return NextResponse.next();
  }

  // Check for x402 payment header
  const paymentHeader = request.headers.get('X-PAYMENT') || request.headers.get('x-payment');

  if (!paymentHeader) {
    // Return 402 Payment Required with x402 payment details
    const paymentDetails = {
      x402Version: 1,
      schemes: [
        {
          scheme: 'exact',
          network: 'base-sepolia',
          maxAmountRequired: PRICE_USDC,
          resource: path,
          description: routeConfig.description,
          mimeType: 'application/json',
          payTo: SELLER_WALLET,
          maxTimeoutSeconds: 60,
          asset: USDC_ADDRESS,
          extra: {
            name: 'USDC',
            decimals: 6,
          },
        },
      ],
    };

    return new NextResponse(
      JSON.stringify({
        error: 'Payment Required',
        message: `This content requires a payment of $${routeConfig.price} USDC`,
        ...paymentDetails,
      }),
      {
        status: 402,
        headers: {
          'Content-Type': 'application/json',
          'X-PAYMENT-REQUIRED': JSON.stringify(paymentDetails),
        },
      }
    );
  }

  // Parse and verify payment (simplified for demo)
  // In production, you would verify the payment signature with the facilitator
  try {
    const payment = JSON.parse(paymentHeader);

    // Basic validation
    if (!payment.payload || !payment.signature) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid payment format' }),
        { status: 400 }
      );
    }

    // In production: Verify with facilitator
    // const isValid = await verifyWithFacilitator(payment);

    // For demo, we'll accept any properly formatted payment
    // The actual verification happens on-chain via the facilitator

    // Add payment info to request headers for the API route
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-PAYMENT-VERIFIED', 'true');
    requestHeaders.set('X-PAYMENT-AMOUNT', PRICE_USD);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Payment verification failed' }),
      { status: 400 }
    );
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/api/articles/1/content',
    '/api/articles/2/content',
    '/api/articles/4/content',
  ],
};
