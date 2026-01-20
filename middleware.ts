import { paymentMiddleware } from 'x402-next';

// Seller's wallet address (receives all payments)
const SELLER_WALLET = '0xad70845D9AE0B40CB68Cc289414Ea21b1Ce18BC8';

// Facilitator configuration (Coinbase's hosted facilitator for Base)
const facilitator = {
  url: 'https://x402.org/facilitator' as `https://${string}`,
};

// Define protected routes with x402 payment requirements
export const middleware = paymentMiddleware(
  SELLER_WALLET,
  {
    // Protect individual article content endpoints
    '/api/articles/1/content': {
      price: '$0.05',
      network: 'base-sepolia',
      config: {
        description: 'Access to premium article: The Future of Micropayments',
      },
    },
    '/api/articles/2/content': {
      price: '$0.05',
      network: 'base-sepolia',
      config: {
        description: 'Access to premium article: Getting Started with Base',
      },
    },
    '/api/articles/4/content': {
      price: '$0.05',
      network: 'base-sepolia',
      config: {
        description: 'Access to premium article: Designing for Web3',
      },
    },
  },
  facilitator
);

// Configure which routes the middleware should run on
export const config = {
  matcher: ['/api/articles/:id/content'],
  runtime: 'nodejs',
};
