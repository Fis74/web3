import { http, createConfig } from "wagmi";
import { mainnet, bsc, auroraTestnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, bsc, auroraTestnet],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [auroraTestnet.id]: http(),
  },
  ssr: true,
});
