# Medium x402

A Medium-like article platform where users pay per article using the **official x402 protocol by Coinbase** and USDC on Base Sepolia.

## Features

- **Wallet Authentication**: Connect with MetaMask, Coinbase Wallet, or other Web3 wallets
- **Pay-Per-Article**: Pay $0.05 USDC to unlock paid articles using x402 protocol
- **Official x402 SDK**: Uses `x402-next` middleware and `x402-fetch` for payments
- **Base Sepolia**: Built on Coinbase's L2 for fast, cheap transactions
- **Claps**: Show appreciation for articles (like Medium)

## What is x402?

[x402](https://x402.org) is an open payment protocol developed by Coinbase that enables instant, automatic stablecoin payments directly over HTTP. It revives the HTTP 402 "Payment Required" status code for streamlined transactions.

### How x402 Works

1. Client requests protected content
2. Server responds with **402 Payment Required** + payment details in headers
3. Client wallet signs payment automatically via `x402-fetch`
4. Server verifies payment through the facilitator
5. Content is delivered

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Wallet**: wagmi, viem, ConnectKit
- **x402**: `x402-next`, `x402-fetch`, `@x402/core`, `@x402/evm`
- **Blockchain**: Base Sepolia, USDC
- **Storage**: localStorage (MVP)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Test USDC on Base Sepolia

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pranavdaa/medium-x402.git
cd medium-x402
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your WalletConnect Project ID
```

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Getting Test USDC

1. Get Sepolia ETH from a faucet
2. Bridge to Base Sepolia using the [official bridge](https://bridge.base.org)
3. Get test USDC from [Circle's faucet](https://faucet.circle.com/)

## Project Structure

```
├── middleware.ts              # x402 payment middleware configuration
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── articles/         # Article listing
│   │   ├── article/[id]/     # Article detail with paywall
│   │   ├── profile/          # User profile
│   │   └── api/
│   │       └── articles/
│   │           └── [id]/
│   │               ├── route.ts        # Article metadata (public)
│   │               └── content/
│   │                   └── route.ts    # Article content (x402 protected)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── Paywall.tsx       # x402-fetch payment component
│   │   ├── ClapsButton.tsx
│   │   └── Providers.tsx
│   ├── lib/
│   │   ├── wagmi.ts          # Wallet config
│   │   └── storage.ts        # localStorage utils
│   └── data/
│       └── articles.ts       # Sample articles
```

## x402 Integration

### Server-Side (middleware.ts)

```typescript
import { paymentMiddleware } from 'x402-next';

export const middleware = paymentMiddleware(
  '0xYourWalletAddress',
  {
    '/api/articles/1/content': {
      price: '$0.05',
      network: 'base-sepolia',
      config: { description: 'Access to premium article' },
    },
  },
  { url: 'https://x402.org/facilitator' }
);
```

### Client-Side (Paywall.tsx)

```typescript
import { wrapFetchWithPayment } from 'x402-fetch';

const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
const response = await fetchWithPayment('/api/articles/1/content');
```

## Configuration

- **Seller Wallet**: `0xad70845D9AE0B40CB68Cc289414Ea21b1Ce18BC8`
- **USDC Contract**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e` (Base Sepolia)
- **Article Price**: $0.05 USDC
- **Network**: Base Sepolia (Chain ID: 84532)

## API Routes

| Route | Method | Description | Protected |
|-------|--------|-------------|-----------|
| `/api/articles` | GET | List all articles | No |
| `/api/articles/[id]` | GET | Get article metadata | No |
| `/api/articles/[id]/content` | GET | Get full article content | **x402** |

## Resources

- [x402 Protocol](https://x402.org)
- [Coinbase x402 Docs](https://docs.cdp.coinbase.com/x402/welcome)
- [x402 GitHub](https://github.com/coinbase/x402)
- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)

## License

MIT
