/**
 * SIWE (Sign-In With Ethereum) utilities
 * Manual implementation without siwe library for Edge/browser compatibility
 */

export function createSiweMessage(
  address: string,
  nonce: string,
  chainId: number,
  domain: string,
  uri: string
): string {
  const issuedAt = new Date().toISOString();

  // EIP-4361 SIWE message format
  const message = `${domain} wants you to sign in with your Ethereum account:
${address}

このウォレットをYAMI DAOアカウントにリンクします。

URI: ${uri}
Version: 1
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}`;

  return message;
}
