// Local storage utilities for purchase tracking

const PURCHASES_KEY = 'medium_x402_purchases';
const CLAPS_KEY = 'medium_x402_claps';

export interface Purchase {
  articleId: string;
  userAddress: string;
  txHash: string;
  timestamp: string;
  amount: string;
}

export interface ClapsData {
  [articleId: string]: {
    total: number;
    userClaps: { [address: string]: number };
  };
}

// Get all purchases for a user
export function getUserPurchases(userAddress: string): Purchase[] {
  if (typeof window === 'undefined') return [];

  const purchases = localStorage.getItem(PURCHASES_KEY);
  if (!purchases) return [];

  const allPurchases: Purchase[] = JSON.parse(purchases);
  return allPurchases.filter(p => p.userAddress.toLowerCase() === userAddress.toLowerCase());
}

// Check if user has purchased an article
export function hasUserPurchased(userAddress: string, articleId: string): boolean {
  const purchases = getUserPurchases(userAddress);
  return purchases.some(p => p.articleId === articleId);
}

// Record a new purchase
export function recordPurchase(purchase: Purchase): void {
  if (typeof window === 'undefined') return;

  const purchases = localStorage.getItem(PURCHASES_KEY);
  const allPurchases: Purchase[] = purchases ? JSON.parse(purchases) : [];
  allPurchases.push(purchase);
  localStorage.setItem(PURCHASES_KEY, JSON.stringify(allPurchases));
}

// Get all purchases (for admin/debugging)
export function getAllPurchases(): Purchase[] {
  if (typeof window === 'undefined') return [];

  const purchases = localStorage.getItem(PURCHASES_KEY);
  return purchases ? JSON.parse(purchases) : [];
}

// Claps functionality
export function getClapsData(): ClapsData {
  if (typeof window === 'undefined') return {};

  const claps = localStorage.getItem(CLAPS_KEY);
  return claps ? JSON.parse(claps) : {};
}

export function getArticleClaps(articleId: string): number {
  const data = getClapsData();
  return data[articleId]?.total || 0;
}

export function getUserClapsForArticle(articleId: string, userAddress: string): number {
  const data = getClapsData();
  return data[articleId]?.userClaps[userAddress.toLowerCase()] || 0;
}

export function addClap(articleId: string, userAddress: string): number {
  if (typeof window === 'undefined') return 0;

  const data = getClapsData();

  if (!data[articleId]) {
    data[articleId] = { total: 0, userClaps: {} };
  }

  const userKey = userAddress.toLowerCase();
  const currentUserClaps = data[articleId].userClaps[userKey] || 0;

  // Max 50 claps per user per article (like Medium)
  if (currentUserClaps >= 50) {
    return data[articleId].total;
  }

  data[articleId].total += 1;
  data[articleId].userClaps[userKey] = currentUserClaps + 1;

  localStorage.setItem(CLAPS_KEY, JSON.stringify(data));

  return data[articleId].total;
}
