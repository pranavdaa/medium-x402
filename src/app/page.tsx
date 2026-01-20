'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

export default function LandingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-medium-black leading-tight mb-6">
                Pay only for what you read
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                No more subscriptions. No more paywalls blocking everything.
                Just connect your wallet and pay <strong>$0.05</strong> per article
                with USDC on Base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isConnected ? (
                  <Link
                    href="/articles"
                    className="inline-flex items-center justify-center bg-medium-green text-white font-semibold py-4 px-8 rounded-full hover:bg-green-700 transition-colors text-lg"
                  >
                    Start Reading
                    <svg
                      className="w-5 h-5 ml-2"
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
                ) : (
                  <ConnectKitButton.Custom>
                    {({ show }) => (
                      <button
                        onClick={show}
                        className="inline-flex items-center justify-center bg-medium-green text-white font-semibold py-4 px-8 rounded-full hover:bg-green-700 transition-colors text-lg"
                      >
                        Connect Wallet to Start
                      </button>
                    )}
                  </ConnectKitButton.Custom>
                )}
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center border-2 border-medium-black text-medium-black font-semibold py-4 px-8 rounded-full hover:bg-gray-50 transition-colors text-lg"
                >
                  Browse Articles
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-medium-green/10 rounded-3xl transform rotate-3" />
                <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-medium-green rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Payment Successful</p>
                      <p className="text-sm text-gray-500">Article unlocked</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-sm">
                    <span className="text-gray-500">Amount paid</span>
                    <span className="font-semibold text-medium-green">$0.05 USDC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-medium-black mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your crypto wallet with USDC on Base Sepolia network
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Browse & Read</h3>
              <p className="text-gray-600">
                Explore articles freely. Free articles are always accessible
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Pay & Unlock</h3>
              <p className="text-gray-600">
                Pay $0.05 USDC to unlock any paid article. Forever yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* x402 Protocol Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-6">
            <span className="font-mono text-sm text-medium-green">x402</span>
            <span className="text-sm text-gray-500">Protocol</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-medium-black mb-6">
            Powered by the x402 Payment Protocol
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            x402 brings the HTTP 402 &ldquo;Payment Required&rdquo; status code to life.
            When you request a paid article, the server returns payment details
            that your wallet can process automatically. No accounts, no credit cards
            &mdash; just seamless crypto payments.
          </p>
          <div className="bg-white rounded-xl p-6 border border-gray-200 font-mono text-sm text-left overflow-x-auto">
            <div className="text-gray-500">// Server response for paid content</div>
            <div className="text-red-600">HTTP/1.1 402 Payment Required</div>
            <div className="text-blue-600">X-Payment-Amount: 0.05</div>
            <div className="text-blue-600">X-Payment-Currency: USDC</div>
            <div className="text-blue-600">X-Payment-Network: base-sepolia</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-medium-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Ready to start reading?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get testnet USDC on Base Sepolia and explore quality content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center bg-white text-medium-black font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              Browse Articles
            </Link>
            <a
              href="https://faucet.circle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
            >
              Get Test USDC
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-medium-black">Medium</span>
              <span className="text-xs bg-medium-green text-white px-2 py-0.5 rounded-full font-medium">
                x402
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Built with x402 protocol on Base Sepolia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
