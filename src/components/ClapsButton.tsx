'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { addClap, getArticleClaps, getUserClapsForArticle } from '@/lib/storage';

interface ClapsButtonProps {
  articleId: string;
  initialClaps: number;
}

export function ClapsButton({ articleId, initialClaps }: ClapsButtonProps) {
  const { address, isConnected } = useAccount();
  const [claps, setClaps] = useState(initialClaps);
  const [userClaps, setUserClaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load claps from storage
    const storedClaps = getArticleClaps(articleId);
    if (storedClaps > 0) {
      setClaps(initialClaps + storedClaps);
    }

    if (address) {
      setUserClaps(getUserClapsForArticle(articleId, address));
    }
  }, [articleId, address, initialClaps]);

  const handleClap = () => {
    if (!isConnected || !address) return;

    if (userClaps >= 50) return; // Max claps reached

    const newTotal = addClap(articleId, address);
    setClaps(initialClaps + newTotal);
    setUserClaps(userClaps + 1);

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClap}
      disabled={!isConnected || userClaps >= 50}
      className={`flex items-center gap-2 text-gray-600 hover:text-medium-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed group ${
        isAnimating ? 'scale-110' : ''
      }`}
      title={
        !isConnected
          ? 'Connect wallet to clap'
          : userClaps >= 50
          ? 'Maximum claps reached'
          : 'Clap for this article'
      }
    >
      <svg
        className={`w-6 h-6 transition-transform ${
          isAnimating ? 'scale-125' : ''
        } ${userClaps > 0 ? 'fill-medium-green text-medium-green' : ''}`}
        fill={userClaps > 0 ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      <span className="font-medium">
        {claps.toLocaleString()}
        {userClaps > 0 && (
          <span className="text-xs text-gray-400 ml-1">({userClaps})</span>
        )}
      </span>
    </button>
  );
}
