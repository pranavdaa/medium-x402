'use client';

import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export function Header() {
  const { isConnected } = useAccount();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-medium-black">Medium</span>
            <span className="text-xs bg-medium-green text-white px-2 py-0.5 rounded-full font-medium">
              x402
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/articles"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Articles
            </Link>
            {isConnected && (
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                My Profile
              </Link>
            )}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header>
  );
}
