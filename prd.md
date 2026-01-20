# Product Requirements Document: Medium x402

## Overview
A Medium-like article platform where users pay per article using the x402 protocol instead of subscriptions. Users authenticate via crypto wallets and pay with USDC on Base Sepolia.

---

## Core Features

### 1. User Authentication
- **Wallet-based login**: Users connect their crypto wallet (MetaMask, Coinbase Wallet, etc.)
- **Profile creation**: Automatic profile creation upon first wallet connection
- **Session management**: Persistent login sessions

### 2. Article System
- **Article listing**: Homepage with featured and recent articles
- **Article categories/tags**: Organize articles by topics
- **Free vs Paid articles**: Some articles are free, others require payment
- **Article reading experience**: Clean, Medium-like typography

### 3. Payment System (x402 Protocol)
- **Pay-per-article**: Each paid article has a USDC price
- **x402 flow**:
  1. User requests paid content
  2. Server returns 402 Payment Required with payment details
  3. User's wallet processes payment
  4. Content unlocks after payment verification
- **Payment currency**: USDC on Base Sepolia
- **Price range**: TBD (e.g., $0.10 - $2.00 per article)

### 4. User Profile
- **Wallet address display**: Show connected wallet
- **Purchase history**: List of purchased articles
- **Reading history**: Articles user has accessed

---

## Technical Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Wallet connection**: wagmi + viem + ConnectKit
- **State management**: React Query for server state

### Backend
- **API routes**: Next.js API routes
- **Database**: TBD (in-memory for MVP vs persistent)
- **Payment verification**: x402 middleware

### Blockchain
- **Network**: Base Sepolia (testnet)
- **Token**: USDC (test tokens)
- **Wallet support**: TBD

---

## Decisions Made

| Question | Decision |
|----------|----------|
| Article creation | **Read-only** - Pre-seeded content only |
| Payment destination | **Single platform wallet** - All payments go to one address |
| Data persistence | **In-memory + localStorage** - Simple, resets on restart |
| Social features | **Claps only** - Simple appreciation feature |
| Article pricing | **Fixed price: $0.05 per article** |
| Wallet library | **ConnectKit** - Clean UX out of the box |
| Home page | **Landing page first** - Then article feed |

---

## MVP Scope

### Must Have
- [x] Landing page with platform explanation
- [ ] Wallet connection via ConnectKit
- [ ] Article listing page (feed)
- [ ] Article detail page with paywall
- [ ] x402 payment flow ($0.05 USDC)
- [ ] Basic user profile with purchase history
- [ ] Claps feature

### Out of Scope (v1)
- Article creation by users
- Comments and bookmarks
- Author payouts
- Analytics dashboard
- Search functionality

---

## Success Metrics
- Users can connect wallet and view profile
- Users can browse free articles
- Users can pay for and access paid articles
- Payments are verified on-chain

