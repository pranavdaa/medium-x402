'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.id}`} className="block group">
      <article className="flex gap-6 py-6 border-b border-gray-100">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Author */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-700">{article.author.name}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors mb-1 line-clamp-2">
            {article.title}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-base mb-3 line-clamp-2 hidden sm:block">
            {article.subtitle}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{article.publishedAt}</span>
            <span>·</span>
            <span>{article.readTime} min read</span>
            {article.isPaid && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-medium-green font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1.5 1.5 0 113 0v3a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-3zM10 14a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  ${article.price}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-3">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div className="hidden sm:block flex-shrink-0">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {article.isPaid && (
              <div className="absolute top-2 right-2 bg-medium-green text-white text-xs px-2 py-0.5 rounded-full">
                Paid
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
