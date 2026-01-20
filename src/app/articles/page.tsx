'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { articles } from '@/data/articles';

type FilterType = 'all' | 'free' | 'paid';

export default function ArticlesPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredArticles = articles.filter((article) => {
    if (filter === 'all') return true;
    if (filter === 'free') return !article.isPaid;
    if (filter === 'paid') return article.isPaid;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-medium-black mb-4">
          Articles
        </h1>
        <p className="text-gray-600">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
            filter === 'all'
              ? 'border-medium-black text-medium-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All Articles
        </button>
        <button
          onClick={() => setFilter('free')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
            filter === 'free'
              ? 'border-medium-black text-medium-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Free
        </button>
        <button
          onClick={() => setFilter('paid')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px flex items-center gap-1 ${
            filter === 'paid'
              ? 'border-medium-black text-medium-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Paid
          <span className="text-xs bg-medium-green text-white px-1.5 py-0.5 rounded-full">
            $0.05
          </span>
        </button>
      </div>

      {/* Articles List */}
      <div>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No articles found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
