import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: "YAMI DAO",
              description: "YAMI DAO - Open Mental Health",
              url: "https://dao.yami.ski",
              icons: ["https://dao.yami.ski/favicon.ico"],
            },
          }),
        ]
      : []),
  ],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});
