'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { parseUnits } from 'viem';
import { ConnectKitButton } from 'connectkit';
import { USDC_ADDRESS, PLATFORM_WALLET, USDC_DECIMALS } from '@/lib/wagmi';
import { recordPurchase } from '@/lib/storage';

// ERC20 ABI for transfer
const erc20Abi = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

interface PaywallProps {
  articleId: string;
  price: string;
  onPaymentSuccess: () => void;
}

export function Paywall({ articleId, price, onPaymentSuccess }: PaywallProps) {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isManualChecking, setIsManualChecking] = useState(false);
  const hasHandledSuccess = useRef(false);
  const publicClient = usePublicClient();

  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess, isError: receiptError } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle successful payment with useEffect
  useEffect(() => {
    if (isSuccess && hash && address && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      recordPurchase({
        articleId,
        userAddress: address,
        txHash: hash,
        timestamp: new Date().toISOString(),
        amount: price,
      });
      onPaymentSuccess();
    }
  }, [isSuccess, hash, address, articleId, price, onPaymentSuccess]);

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      setError(writeError.message || 'Transaction failed');
    }
  }, [writeError]);

  // Manual verification if auto-detection fails
  const handleManualVerify = async () => {
    if (!hash || !address || !publicClient) return;

    setIsManualChecking(true);
    setError(null);

    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        timeout: 60_000,
      });

      if (receipt.status === 'success' && !hasHandledSuccess.current) {
        hasHandledSuccess.current = true;
        recordPurchase({
          articleId,
          userAddress: address,
          txHash: hash,
          timestamp: new Date().toISOString(),
          amount: price,
        });
        onPaymentSuccess();
      } else if (receipt.status === 'reverted') {
        setError('Transaction was reverted. Please try again.');
        reset();
      }
    } catch (err: any) {
      setError('Could not verify transaction. Please check the block explorer.');
    } finally {
      setIsManualChecking(false);
    }
  };

  const handlePayment = () => {
    if (!address) return;

    setError(null);
    hasHandledSuccess.current = false;

    try {
      const amount = parseUnits(price, USDC_DECIMALS);

      writeContract({
        address: USDC_ADDRESS as `0x${string}`,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [PLATFORM_WALLET as `0x${string}`, amount],
      });
    } catch (err: any) {
      setError(err.message || 'Payment failed');
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

            {/* Show transaction hash if available */}
            {hash && (isConfirming || receiptError) && (
              <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg">
                <p className="mb-1">Transaction submitted!</p>
                <a
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all"
                >
                  View on BaseScan
                </a>
              </div>
            )}

            {/* Main payment button */}
            {!hash && (
              <button
                onClick={handlePayment}
                disabled={isPending}
                className="w-full bg-medium-green text-white font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Confirm in wallet...' : `Pay $${price} USDC`}
              </button>
            )}

            {/* Processing state with verify option */}
            {hash && isConfirming && !isManualChecking && (
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full bg-medium-green text-white font-semibold py-3 px-6 rounded-full opacity-50 cursor-not-allowed"
                >
                  Processing...
                </button>
                <button
                  onClick={handleManualVerify}
                  className="w-full border-2 border-medium-green text-medium-green font-semibold py-2 px-6 rounded-full hover:bg-medium-green/10 transition-colors text-sm"
                >
                  Verify Payment Manually
                </button>
              </div>
            )}

            {/* Manual verification in progress */}
            {isManualChecking && (
              <button
                disabled
                className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-full opacity-70 cursor-not-allowed"
              >
                Verifying transaction...
              </button>
            )}

            {/* Retry option on error */}
            {hash && receiptError && !isManualChecking && (
              <div className="space-y-3">
                <button
                  onClick={handleManualVerify}
                  className="w-full bg-medium-green text-white font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition-colors"
                >
                  Verify Payment
                </button>
                <button
                  onClick={() => { reset(); setError(null); }}
                  className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-50 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            <p className="text-xs text-gray-500">
              Payment is processed on Base Sepolia using USDC
            </p>
          </div>
        )}

        {/* x402 badge */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            Powered by
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">
              x402
            </span>
            protocol
          </p>
        </div>
      </div>
    </div>
  );
}
