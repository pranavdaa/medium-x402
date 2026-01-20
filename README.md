# Medium x402

A Medium-like article platform where users pay per article using the x402 protocol and USDC on Base Sepolia.

## Features

- **Wallet Authentication**: Connect with MetaMask, Coinbase Wallet, or other Web3 wallets
- **Pay-Per-Article**: Pay $0.05 USDC to unlock paid articles (no subscriptions!)
- **x402 Protocol**: Uses HTTP 402 Payment Required for payment flow
- **Base Sepolia**: Built on Coinbase's L2 for fast, cheap transactions
- **Claps**: Show appreciation for articles (like Medium)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Wallet**: wagmi, viem, ConnectKit
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
cd medium-x402
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your WalletConnect Project ID
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Getting Test USDC

1. Get Sepolia ETH from a faucet
2. Bridge to Base Sepolia using the [official bridge](https://bridge.base.org)
3. Get test USDC from [Circle's faucet](https://faucet.circle.com/)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── articles/          # Article listing
│   ├── article/[id]/      # Article detail
│   ├── profile/           # User profile
│   └── api/               # API routes
├── components/            # React components
│   ├── Header.tsx
│   ├── ArticleCard.tsx
│   ├── Paywall.tsx
│   ├── ClapsButton.tsx
│   └── Providers.tsx
├── lib/                   # Utilities
│   ├── wagmi.ts          # Wallet config
│   ├── x402.ts           # x402 payment utils
│   └── storage.ts        # localStorage utils
├── data/                  # Mock data
│   └── articles.ts
└── types/                 # TypeScript types
    └── index.ts
```

## How It Works

### Payment Flow (x402)

1. User opens a paid article
2. They see a preview with a paywall
3. Clicking "Pay" triggers a USDC transfer to the platform wallet
4. Once confirmed, the full article content is unlocked
5. Purchase is stored in localStorage for persistence

### Configuration

- **Platform Wallet**: `0xad70845D9AE0B40CB68Cc289414Ea21b1Ce18BC8`
- **USDC Contract**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e` (Base Sepolia)
- **Article Price**: $0.05 USDC

## API Routes

- `GET /api/articles` - List all articles
- `GET /api/articles/[id]` - Get article (returns 402 if paid and no payment proof)
- `POST /api/pay` - Verify payment and unlock article

## License

MIT
