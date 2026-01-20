export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  walletAddress?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  previewContent: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  coverImage: string;
  tags: string[];
  isPaid: boolean;
  price: string; // Price in USDC (e.g., "0.50")
  claps: number;
}

export interface UserProfile {
  address: string;
  purchasedArticles: string[];
  createdAt: string;
}

export interface PaymentReceipt {
  articleId: string;
  userAddress: string;
  amount: string;
  txHash: string;
  timestamp: string;
}
