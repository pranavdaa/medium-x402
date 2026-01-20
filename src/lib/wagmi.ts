import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

// Platform wallet address (receives all payments)
export const PLATFORM_WALLET = '0xad70845D9AE0B40CB68Cc289414Ea21b1Ce18BC8';

// USDC contract address on Base Sepolia
export const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';

// USDC has 6 decimals
export const USDC_DECIMALS = 6;

// Article price in USDC
export const ARTICLE_PRICE = '0.05';
export const ARTICLE_PRICE_WEI = BigInt(50000); // 0.05 USDC = 50000 (6 decimals)

export const config = createConfig(
  getDefaultConfig({
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    appName: 'Medium x402',
    appDescription: 'Pay-per-article platform powered by x402',
    appUrl: 'https://medium-x402.example.com',
    appIcon: 'https://medium-x402.example.com/icon.png',
  })
);

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
