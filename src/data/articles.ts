import { Article, Author } from '@/types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    bio: 'Tech writer and blockchain enthusiast. Writing about the future of decentralized systems.',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    bio: 'Software engineer at a Web3 startup. Sharing insights on building decentralized applications.',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    bio: 'Product designer exploring the intersection of UX and blockchain technology.',
  },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Future of Micropayments: How x402 is Revolutionizing Content Monetization',
    subtitle: 'A deep dive into the HTTP 402 Payment Required protocol and its implications for creators',
    previewContent: `The internet was built with a payment layer in mind. HTTP status code 402 — "Payment Required" — has been reserved since 1999, waiting for the right technology to bring it to life. Now, with the advent of stablecoins and efficient blockchain networks, we're finally seeing this vision materialize.

The x402 protocol represents a paradigm shift in how we think about online content monetization. Instead of intrusive ads or expensive subscriptions, creators can now charge micro-amounts for individual pieces of content.`,
    content: `The internet was built with a payment layer in mind. HTTP status code 402 — "Payment Required" — has been reserved since 1999, waiting for the right technology to bring it to life. Now, with the advent of stablecoins and efficient blockchain networks, we're finally seeing this vision materialize.

The x402 protocol represents a paradigm shift in how we think about online content monetization. Instead of intrusive ads or expensive subscriptions, creators can now charge micro-amounts for individual pieces of content.

## Why Micropayments Matter

Traditional subscription models force users into all-or-nothing decisions. Want to read one article from The New York Times? You need a full subscription. Interested in a single tutorial on a learning platform? Better sign up for the monthly plan.

This friction creates a lose-lose situation:
- Readers pay for content they don't consume
- Creators miss out on potential readers who won't commit to subscriptions
- The internet becomes increasingly siloed behind paywalls

Micropayments solve this by enabling granular transactions. Read one article for $0.25. Access a premium feature for $0.10. Pay exactly for what you use.

## How x402 Works

The x402 protocol leverages HTTP's built-in payment status code (402) combined with blockchain payments. Here's the flow:

1. User requests protected content
2. Server responds with 402 Payment Required
3. Response includes payment details (amount, recipient, network)
4. User's wallet automatically handles the payment
5. User receives the content

The beauty of this system is its simplicity. No accounts to create, no credit cards to enter, no subscriptions to manage. Just seamless, instant payments.

## The Role of Stablecoins

USDC on networks like Base makes micropayments practical. With transaction fees measured in fractions of a cent and near-instant finality, paying $0.50 for an article becomes economically viable.

Base, as an Ethereum L2, provides:
- Sub-second transaction times
- Fees under $0.01
- USDC stability (1:1 with USD)
- Ethereum security guarantees

## Building for the Future

For developers, implementing x402 is straightforward. The protocol is designed to be:
- **Stateless**: Each request is independent
- **Transparent**: Payment terms are clearly communicated
- **Interoperable**: Works with any x402-compatible wallet

The implications extend beyond articles. APIs, streaming content, AI services — any digital resource can be monetized with micropayments.

## Conclusion

The x402 protocol isn't just a new payment method; it's a fundamental reimagining of how value flows on the internet. By making micropayments frictionless and economical, we're unlocking new possibilities for creators and consumers alike.

The future of content isn't subscriptions or ads — it's paying for exactly what you value, when you value it.`,
    author: authors[0],
    publishedAt: '2024-01-15',
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    tags: ['Blockchain', 'Web3', 'Payments', 'Technology'],
    isPaid: true,
    price: '0.05',
    claps: 2847,
  },
  {
    id: '2',
    title: 'Getting Started with Base: A Developer\'s Guide to Ethereum L2',
    subtitle: 'Everything you need to know to start building on Coinbase\'s Layer 2 network',
    previewContent: `Base has emerged as one of the most developer-friendly Layer 2 networks in the Ethereum ecosystem. Built by Coinbase using the OP Stack, it offers the security of Ethereum with the speed and affordability developers need.

In this comprehensive guide, we'll walk through everything you need to start building on Base, from setting up your development environment to deploying your first smart contract.`,
    content: `Base has emerged as one of the most developer-friendly Layer 2 networks in the Ethereum ecosystem. Built by Coinbase using the OP Stack, it offers the security of Ethereum with the speed and affordability developers need.

In this comprehensive guide, we'll walk through everything you need to start building on Base, from setting up your development environment to deploying your first smart contract.

## What is Base?

Base is an Ethereum Layer 2 (L2) network built on the OP Stack — the same technology powering Optimism. It inherits Ethereum's security while providing:

- **Lower costs**: Transactions cost a fraction of Ethereum mainnet
- **Faster confirmations**: Near-instant transaction finality
- **EVM compatibility**: Deploy existing Solidity contracts without changes
- **Coinbase integration**: Easy onramps for millions of Coinbase users

## Setting Up Your Environment

First, let's configure your development tools for Base Sepolia (the testnet).

Add Base Sepolia to your wallet:
- Network Name: Base Sepolia
- RPC URL: https://sepolia.base.org
- Chain ID: 84532
- Currency: ETH
- Explorer: https://sepolia.basescan.org

For development, you'll want to use Hardhat or Foundry. Both work seamlessly with Base.

## Getting Testnet Funds

Before deploying, you'll need testnet ETH and USDC:

1. Get Sepolia ETH from a faucet
2. Bridge to Base Sepolia using the official bridge
3. For USDC, use the Circle faucet or testnet distribution

## Your First Contract

Let's deploy a simple payment contract that accepts USDC:

The contract accepts USDC payments and tracks which addresses have paid. This pattern is the foundation for pay-per-content systems.

## Interacting with USDC

USDC on Base Sepolia has a specific contract address. Always verify you're using the correct address for your network.

Key considerations:
- USDC has 6 decimals (not 18 like ETH)
- Users must approve your contract before it can transfer their USDC
- Always check for sufficient allowance before attempting transfers

## Best Practices

1. **Test thoroughly**: Use Base Sepolia before mainnet
2. **Monitor gas**: Even on L2, optimize your contracts
3. **Handle errors gracefully**: Network issues happen
4. **Use verified contracts**: Verify on Basescan for transparency

## Conclusion

Base offers an excellent platform for building payment-enabled applications. With low fees, fast transactions, and a massive potential user base through Coinbase, it's an ideal choice for micropayment systems.

Start building on Base today and be part of the onchain economy.`,
    author: authors[1],
    publishedAt: '2024-01-12',
    readTime: 12,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    tags: ['Ethereum', 'Base', 'Development', 'Tutorial'],
    isPaid: true,
    price: '0.05',
    claps: 1923,
  },
  {
    id: '3',
    title: 'Why I Switched from Subscription Models to Pay-Per-Article',
    subtitle: 'A creator\'s perspective on the economics of micropayments',
    previewContent: `After five years of running a subscription-based newsletter, I made a radical change: I switched to pay-per-article pricing. The results surprised me.

This isn't a story about making more money (though that happened). It's about building a healthier relationship with my readers and creating better content.`,
    content: `After five years of running a subscription-based newsletter, I made a radical change: I switched to pay-per-article pricing. The results surprised me.

This isn't a story about making more money (though that happened). It's about building a healthier relationship with my readers and creating better content.

## The Subscription Trap

When I launched my newsletter in 2019, subscriptions were the obvious choice. Charge $10/month, send weekly content, build recurring revenue. Simple, right?

But I noticed troubling patterns:

- **Guilt-driven consumption**: Subscribers felt obligated to read everything
- **Churn anxiety**: I worried constantly about cancellations
- **Content padding**: I stretched ideas thin to maintain frequency
- **Access barriers**: Many interested readers wouldn't commit to subscriptions

The subscription model was optimizing for retention, not value.

## The Micropayment Experiment

In late 2023, I discovered x402 and decided to experiment. I made my archive available for $0.50 per article and continued publishing, letting readers choose what to pay for.

The first month was terrifying. Revenue dropped 60%. But I kept going.

## What Changed

By month three, something interesting happened:

1. **More total readers**: Without the subscription barrier, readership tripled
2. **Higher per-article value**: Popular articles generated more than subscription equivalents
3. **Better feedback**: Payment became a signal of value
4. **Improved writing**: I focused on quality over quantity

## The Economics

Let's break down the numbers:

**Before (Subscription)**:
- 500 subscribers at $10/month = $5,000/month
- Churn rate: 8%/month
- Content: 4 articles/month (required)

**After (Pay-per-article)**:
- 5,000 active readers
- Average: 2 paid articles/reader/month
- Price: $0.50/article
- Revenue: $5,000/month (same!)

But here's the key difference: I now publish 2-3 high-quality articles instead of 4 mediocre ones. My readers are happier, and I'm less burned out.

## Lessons Learned

1. **Quality compounds**: One great article beats four okay ones
2. **Friction matters**: Lower barriers expand your audience
3. **Signals are valuable**: Payments tell you what resonates
4. **Freedom enables creativity**: No publication schedule means better ideas

## Is It Right for You?

Micropayments work best when:
- Your content has standalone value
- You have a large potential audience
- You want to focus on quality
- You're comfortable with variable income

They might not work if:
- You need predictable revenue
- Your content is sequential (courses, series)
- Your audience prefers bundled access

## The Future

I believe we're at an inflection point. As payment infrastructure improves and readers become comfortable with micropayments, more creators will make this switch.

The subscription era isn't over, but it's no longer the only option. And that's good for everyone.`,
    author: authors[0],
    publishedAt: '2024-01-10',
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
    tags: ['Creator Economy', 'Writing', 'Monetization'],
    isPaid: false,
    price: '0',
    claps: 4521,
  },
  {
    id: '4',
    title: 'Designing for Web3: UX Patterns That Actually Work',
    subtitle: 'How to create intuitive experiences in decentralized applications',
    previewContent: `Web3 has a UX problem. Complicated wallet connections, confusing transaction flows, and intimidating terminology drive away mainstream users. But it doesn't have to be this way.

Over the past two years, I've designed interfaces for dozens of decentralized applications. Here are the patterns that consistently improve user experience.`,
    content: `Web3 has a UX problem. Complicated wallet connections, confusing transaction flows, and intimidating terminology drive away mainstream users. But it doesn't have to be this way.

Over the past two years, I've designed interfaces for dozens of decentralized applications. Here are the patterns that consistently improve user experience.

## The Current State of Web3 UX

Let's be honest: most dApps are confusing. Users face:

- Wallet selection overwhelm (20+ wallet options)
- Gas fee anxiety (will this transaction drain my wallet?)
- Confirmation uncertainty (did it work? is it pending?)
- Jargon overload (what's a nonce? why do I need to sign?)

These friction points aren't inevitable. They're design choices, and we can make better ones.

## Pattern 1: Progressive Disclosure

Don't show users everything at once. Reveal complexity as needed.

**Bad**: Show gas fees, network selection, and advanced options immediately
**Good**: Show the action and total cost; hide details behind "Advanced"

Users who need control can find it. Everyone else gets simplicity.

## Pattern 2: Contextual Education

When users encounter unfamiliar concepts, explain them in context.

Instead of assuming users know what "signing" means, provide a brief tooltip: "Signing verifies you own this wallet. It's free and doesn't move any funds."

This reduces anxiety and builds understanding gradually.

## Pattern 3: Optimistic Updates

Blockchain transactions take time. Don't make users stare at spinners.

Show optimistic UI updates immediately:
1. User clicks "Pay"
2. UI shows "Payment complete" (optimistically)
3. Background: transaction confirms
4. If it fails, show error and recovery options

This matches user expectations from Web2 and reduces perceived wait times.

## Pattern 4: Unified Wallet Experience

The wallet connection flow is often the first interaction. Make it seamless.

Best practices:
- Default to the most popular wallet for your audience
- Remember previous connections
- Show clear wallet state (connected, balance, network)
- Provide easy switching for power users

Libraries like ConnectKit and RainbowKit handle this well.

## Pattern 5: Human-Readable Amounts

Nobody thinks in wei or gwei. Always show human-readable amounts.

- Show "$0.50" not "500000" (USDC with 6 decimals)
- Show "0.05 ETH (~$125)" for context
- Use familiar formatting (commas, decimal places)

## Pattern 6: Clear Transaction States

Users need to know what's happening. Provide clear states:

1. **Preparing**: Building the transaction
2. **Awaiting signature**: Wallet prompt is open
3. **Submitted**: Transaction sent to network
4. **Confirming**: Waiting for block inclusion
5. **Complete**: Transaction successful
6. **Failed**: Something went wrong (with explanation)

Each state should have clear visual treatment and next steps.

## Pattern 7: Error Recovery

When things go wrong (and they will), help users recover:

- Explain what happened in plain language
- Provide specific actions to resolve
- Don't lose user input/progress
- Offer support channels for complex issues

## Implementing These Patterns

Start with user research. Watch real people use your dApp. Note where they hesitate, ask questions, or give up.

Then iterate:
1. Simplify the happy path
2. Add contextual help
3. Handle errors gracefully
4. Test with non-crypto users

## The Future of Web3 UX

As the infrastructure matures, we'll see:
- Account abstraction eliminating gas management
- Social recovery replacing seed phrases
- Embedded wallets removing connection flows

But we don't have to wait. Good UX is possible today with thoughtful design.

The teams that prioritize user experience will win mainstream adoption. The technology is ready. Now we need the design to match.`,
    author: authors[2],
    publishedAt: '2024-01-08',
    readTime: 10,
    coverImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop',
    tags: ['Design', 'UX', 'Web3', 'Best Practices'],
    isPaid: true,
    price: '0.05',
    claps: 3156,
  },
  {
    id: '5',
    title: 'Understanding USDC: The Stablecoin Powering Web3 Payments',
    subtitle: 'A comprehensive guide to Circle\'s USD Coin and its role in the crypto ecosystem',
    previewContent: `Stablecoins are the backbone of the crypto economy, and USDC has emerged as the gold standard for payments. But what exactly is USDC, and why has it become so important?

In this article, we'll explore the mechanics of USDC, its advantages for payments, and how it enables new possibilities like micropayments.`,
    content: `Stablecoins are the backbone of the crypto economy, and USDC has emerged as the gold standard for payments. But what exactly is USDC, and why has it become so important?

In this article, we'll explore the mechanics of USDC, its advantages for payments, and how it enables new possibilities like micropayments.

## What is USDC?

USDC (USD Coin) is a stablecoin — a cryptocurrency designed to maintain a 1:1 value with the US dollar. It's issued by Circle, a regulated financial technology company.

Key characteristics:
- **Fully backed**: Each USDC is backed by $1 in reserves
- **Audited**: Regular attestations by major accounting firms
- **Regulated**: Circle operates under US money transmission laws
- **Multi-chain**: Available on Ethereum, Base, Polygon, Solana, and more

## How USDC Maintains Its Peg

Unlike algorithmic stablecoins, USDC uses a straightforward reserve model:

1. User deposits $1 USD with Circle
2. Circle mints 1 USDC
3. Reserves are held in cash and short-term treasuries
4. User can redeem USDC for $1 at any time

This simple mechanism has proven robust through multiple market cycles.

## Why USDC for Payments?

USDC solves key problems with crypto payments:

**Problem 1: Volatility**
Bitcoin can swing 10% in a day. That's fine for speculation, but terrible for commerce. USDC stays at $1.

**Problem 2: Mental Math**
Pricing in ETH requires constant conversion. With USDC, $0.50 means $0.50.

**Problem 3: Merchant Risk**
Accepting volatile crypto means price risk. USDC eliminates this.

## USDC on Layer 2s

While Ethereum mainnet USDC works, Layer 2 networks make it practical for small payments:

| Network | Transaction Fee | Speed |
|---------|-----------------|-------|
| Ethereum | $2-20 | Minutes |
| Base | $0.001-0.01 | Seconds |
| Polygon | $0.001-0.01 | Seconds |

For a $0.50 micropayment, Base's fraction-of-a-cent fee makes sense. Ethereum's $5 fee doesn't.

## Technical Details

USDC is an ERC-20 token with some specific properties:

- **Decimals**: 6 (not 18 like most tokens)
- **Blacklist**: Circle can freeze addresses (regulatory compliance)
- **Upgradeable**: Contract can be updated by Circle

For developers:
- Always use 6 decimals in calculations
- Handle the approval pattern for transfers
- Test on testnets first (Base Sepolia has test USDC)

## USDC in Micropayments

Traditional payment rails can't handle small transactions economically:

- Credit cards: $0.30 + 2.9% (minimum ~$0.30)
- PayPal: $0.30 + 2.9%
- Bank transfer: Often $15-30 for international

USDC on L2s changes the math:
- $0.50 payment with $0.005 fee = 1% cost
- $0.10 payment with $0.005 fee = 5% cost

This makes pay-per-article, API calls, and other micropayments viable.

## The Future of USDC

Circle continues to expand USDC's reach:

- More blockchain networks
- Direct merchant integrations
- Banking partnerships
- Programmable payments

As adoption grows, USDC is becoming the default currency for internet commerce.

## Conclusion

USDC bridges traditional finance and crypto, providing the stability needed for everyday transactions while enabling the programmability and speed of blockchain payments.

For anyone building payment systems, understanding USDC is essential. It's not just a cryptocurrency — it's the infrastructure for a new financial system.`,
    author: authors[1],
    publishedAt: '2024-01-05',
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    tags: ['USDC', 'Stablecoins', 'Crypto', 'Finance'],
    isPaid: false,
    price: '0',
    claps: 1847,
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getPaidArticles(): Article[] {
  return articles.filter((article) => article.isPaid);
}

export function getFreeArticles(): Article[] {
  return articles.filter((article) => !article.isPaid);
}
