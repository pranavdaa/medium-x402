import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Medium x402 - Pay Per Article',
  description: 'A Medium-like platform where you pay per article using x402 protocol and USDC on Base',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
