import '../styles/globals.css';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';
import { AuthContextProvider } from '../context/AuthContext';

// // 1. Get projectID at https://cloud.walletconnect.com
// if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
//   throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
// }

const projectId = 'c866dd54bb4c1d2d1e4675f93c179572';

// 2. Configure wagmi client
const chains = [mainnet, polygon, optimism, arbitrum, avalanche, fantom, bsc];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </AuthContextProvider>
  );
}
