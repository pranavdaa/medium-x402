'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';
import { getUserPurchases, Purchase } from '@/lib/storage';
import { getArticleById } from '@/data/articles';
import { Article } from '@/types';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasedArticles, setPurchasedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (address) {
      const userPurchases = getUserPurchases(address);
      setPurchases(userPurchases);

      // Get article details for each purchase
      const articles = userPurchases
        .map((p) => getArticleById(p.articleId))
        .filter((a): a is Article => a !== undefined);
      setPurchasedArticles(articles);
    }
  }, [address]);

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Connect your wallet to view your profile
        </h1>
        <p className="text-gray-600 mb-8">
          Your wallet address is your identity. Connect to see your purchased articles.
        </p>
        <ConnectKitButton />
      </div>
    );
  }

  const totalSpent = purchases.reduce(
    (sum, p) => sum + parseFloat(p.amount),
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-medium-green/10 to-blue-50 rounded-2xl p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-medium-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {address?.slice(2, 4).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border border-gray-200">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(address || '')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy address"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Articles Purchased</p>
            <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-medium-green">
              ${totalSpent.toFixed(2)} USDC
            </p>
          </div>
        </div>
      </div>

      {/* Purchased Articles */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Purchased Articles</h2>

        {purchasedArticles.length > 0 ? (
          <div className="space-y-4">
            {purchasedArticles.map((article) => {
              const purchase = purchases.find((p) => p.articleId === article.id);
              return (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-medium-green transition-colors"
                >
                  <div className="flex gap-4">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        By {article.author.name} · {article.readTime} min read
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1 text-medium-green">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Purchased
                        </span>
                        {purchase && (
                          <>
                            <span>·</span>
                            <span>
                              {new Date(purchase.timestamp).toLocaleDateString()}
                            </span>
                            <span>·</span>
                            <span>${purchase.amount} USDC</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">You haven&apos;t purchased any articles yet</p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-medium-green font-medium hover:underline"
            >
              Browse articles
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Transaction History */}
      {purchases.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Article
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    TX
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {purchases.map((purchase, index) => {
                  const article = getArticleById(purchase.articleId);
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <span className="line-clamp-1">
                          {article?.title || `Article #${purchase.articleId}`}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-medium-green font-medium">
                        ${purchase.amount}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(purchase.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://sepolia.basescan.org/tx/${purchase.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-mono text-xs"
                        >
                          {purchase.txHash.slice(0, 8)}...
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
