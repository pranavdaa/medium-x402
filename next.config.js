/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
  webpack: (config, { isServer }) => {
    // Handle Solana/Node.js polyfills for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        'process/browser': false,
      };
    }

    // Ignore problematic Solana modules since we only use EVM
    config.resolve.alias = {
      ...config.resolve.alias,
      '@solana/web3.js': false,
    };

    return config;
  },
  // Transpile x402 packages
  transpilePackages: ['x402-next', 'x402-fetch', 'x402', '@x402/core', '@x402/evm'],
};

module.exports = nextConfig;
