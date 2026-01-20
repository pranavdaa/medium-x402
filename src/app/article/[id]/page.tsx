'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { getArticleById } from '@/data/articles';
import { Paywall } from '@/components/Paywall';
import { ClapsButton } from '@/components/ClapsButton';
import { hasUserPurchased } from '@/lib/storage';

export default function ArticlePage() {
  const params = useParams();
  const { address } = useAccount();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [paidContent, setPaidContent] = useState<string | null>(null);

  const article = getArticleById(params.id as string);

  useEffect(() => {
    if (address && article) {
      const purchased = hasUserPurchased(address, article.id);
      setHasPurchased(purchased);
      setShowFullContent(!article.isPaid || purchased);
    } else if (article) {
      setShowFullContent(!article.isPaid);
    }
  }, [address, article]);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
        <Link href="/articles" className="text-medium-green hover:underline">
          Back to articles
        </Link>
      </div>
    );
  }

  // Handle successful x402 payment - receives content from the API
  const handlePaymentSuccess = (content: string) => {
    setHasPurchased(true);
    setShowFullContent(true);
    setPaidContent(content);
  };

  // Use paid content if available, otherwise use article content
  const displayContent = paidContent || article.content;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-medium-black leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{article.author.name}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{article.publishedAt}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
              {article.isPaid && !hasPurchased && (
                <>
                  <span>·</span>
                  <span className="text-medium-green font-medium">
                    ${article.price} to read
                  </span>
                </>
              )}
              {hasPurchased && (
                <>
                  <span>·</span>
                  <span className="text-medium-green font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Purchased
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-64 sm:h-96 object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative">
        {showFullContent ? (
          // Full article content
          <div className="article-content">
            {displayContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index}>{paragraph.replace('## ', '')}</h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc ml-6 mb-6">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('1. ')) {
                return (
                  <ol key={index} className="list-decimal ml-6 mb-6">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\. /, '')}</li>
                    ))}
                  </ol>
                );
              }
              if (paragraph.startsWith('|')) {
                // Simple table handling
                return (
                  <div key={index} className="overflow-x-auto mb-6">
                    <table className="min-w-full text-sm border border-gray-200">
                      {paragraph.split('\n').map((row, i) => {
                        if (row.includes('---')) return null;
                        const cells = row.split('|').filter(Boolean);
                        return (
                          <tr key={i} className={i === 0 ? 'bg-gray-50' : ''}>
                            {cells.map((cell, j) => (
                              <td key={j} className="px-4 py-2 border-b border-gray-200">
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        ) : (
          // Preview content with paywall
          <div>
            <div className="article-content">
              {article.previewContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Paywall */}
            <div className="mt-8">
              <Paywall
                articleId={article.id}
                price={article.price}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        )}
      </div>

      {/* Article Footer */}
      {showFullContent && (
        <footer className="mt-12 pt-8 border-t border-gray-200">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Claps and Share */}
          <div className="flex items-center justify-between">
            <ClapsButton articleId={article.id} initialClaps={article.claps} />

            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Written by {article.author.name}
                </p>
                <p className="text-gray-600 text-sm">{article.author.bio}</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </article>
  );
}
