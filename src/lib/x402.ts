import { encodeFunctionData, parseUnits } from 'viem';
import { USDC_ADDRESS, PLATFORM_WALLET, ARTICLE_PRICE, USDC_DECIMALS } from './wagmi';

// ERC20 Transfer ABI
const erc20TransferAbi = [
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

// Generate x402 payment details
export function generatePaymentDetails(articleId: string) {
  const amount = parseUnits(ARTICLE_PRICE, USDC_DECIMALS);

  return {
    // x402 standard fields
    scheme: 'exact',
    network: 'base-sepolia',
    currency: 'USDC',
    amount: ARTICLE_PRICE,
    amountWei: amount.toString(),
    recipient: PLATFORM_WALLET,
    token: USDC_ADDRESS,
    articleId,

    // Additional metadata
    description: `Unlock article #${articleId}`,
    expiry: Date.now() + 30 * 60 * 1000, // 30 minutes
  };
}

// Generate the transaction data for USDC transfer
export function generateTransferData(amount: bigint) {
  return encodeFunctionData({
    abi: erc20TransferAbi,
    functionName: 'transfer',
    args: [PLATFORM_WALLET as `0x${string}`, amount],
  });
}

// Verify a payment transaction (simplified for MVP)
// In production, this would verify on-chain
export async function verifyPayment(txHash: string, articleId: string): Promise<boolean> {
  // For MVP, we'll do a basic check
  // In production, you'd verify:
  // 1. Transaction exists and is confirmed
  // 2. Transfer was to PLATFORM_WALLET
  // 3. Amount was correct
  // 4. Token was USDC

  if (!txHash || !txHash.startsWith('0x') || txHash.length !== 66) {
    return false;
  }

  // Simulate verification delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return true;
}

// Format payment response for 402 status
export function formatPaymentRequired(articleId: string) {
  const details = generatePaymentDetails(articleId);

  return {
    status: 402,
    message: 'Payment Required',
    payment: details,
    headers: {
      'X-Payment-Required': 'true',
      'X-Payment-Amount': details.amount,
      'X-Payment-Currency': details.currency,
      'X-Payment-Network': details.network,
      'X-Payment-Recipient': details.recipient,
    },
  };
}
