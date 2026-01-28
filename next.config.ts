import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/yamisskey-dev/yamisskey-assets/**",
      },
    ],
  },
  webpack: (config) => {
    // Suppress warnings for optional wagmi connector dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "porto/internal": false,
      porto: false,
      "@base-org/account": false,
      "@coinbase/wallet-sdk": false,
      "@gemini-wallet/core": false,
      "@metamask/sdk": false,
      "@safe-global/safe-apps-sdk": false,
      "@safe-global/safe-apps-provider": false,
      "@walletconnect/ethereum-provider": false,
    };
    return config;
  },
};

export default nextConfig;
