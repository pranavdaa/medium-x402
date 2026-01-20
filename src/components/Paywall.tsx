'use client';

import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { wrapFetchWithPayment } from 'x402-fetch';
import { recordPurchase } from '@/lib/storage';

interface PaywallProps {
  articleId: string;
  price: string;
  onPaymentSuccess: (content: string) => void;
}

export function Paywall({ articleId, price, onPaymentSuccess }: PaywallProps) {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!address || !walletClient) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Wrap fetch with x402 payment capability
      const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);

      // Make request to x402-protected endpoint
      // The x402-fetch wrapper will automatically handle:
      // 1. Detecting 402 Payment Required response
      // 2. Signing the payment with the wallet
      // 3. Retrying the request with payment proof
      const response = await fetchWithPayment(`/api/articles/${articleId}/content`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Payment failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.article) {
        // Record the purchase locally
        recordPurchase({
          articleId,
          userAddress: address,
          txHash: `x402-${Date.now()}`, // x402 handles tx internally
          timestamp: new Date().toISOString(),
          amount: price,
        });

        // Pass the full content to parent
        onPaymentSuccess(data.article.content);
      } else {
        throw new Error('Failed to retrieve article content');
      }
    } catch (err: any) {
      console.error('x402 payment error:', err);

      // Handle user rejection
      if (err.message?.includes('User rejected') || err.message?.includes('denied')) {
        setError('Transaction was rejected. Please try again.');
      } else if (err.message?.includes('insufficient')) {
        setError('Insufficient USDC balance. Please add funds to your wallet.');
      } else {
        setError(err.message || 'Payment failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Blurred preview overlay */}
      <div className="absolute inset-0 paywall-gradient z-10" />

      {/* Payment card */}
      <div className="relative z-20 bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-medium-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-medium-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            This is a paid article
          </h3>
          <p className="text-gray-600">
            Unlock this article with a one-time payment of{' '}
            <span className="font-semibold text-medium-green">${price} USDC</span>
          </p>
        </div>

        {!isConnected ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Connect your wallet to continue
            </p>
            <ConnectKitButton.Custom>
              {({ show }) => (
                <button
                  onClick={show}
                  className="w-full bg-medium-green text-white font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </ConnectKitButton.Custom>
          </div>
        ) : (
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-medium-green text-white font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing payment...
                </span>
              ) : (
                `Pay $${price} USDC`
              )}
            </button>

            <p className="text-xs text-gray-500">
              Payment is processed via x402 protocol on Base Sepolia
            </p>
          </div>
        )}

        {/* x402 badge */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            Powered by
            <a
              href="https://x402.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono bg-gray-100 px-1.5 py-0.5 rounded hover:bg-gray-200 transition-colors"
            >
              x402
            </a>
            protocol by Coinbase
          </p>
        </div>
      </div>
    </div>
  );
}
