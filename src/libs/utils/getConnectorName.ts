import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import type { Connector } from "@web3-react/types";

const getConnectorName = (connector: Connector) => {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof Network) return "Network";
  return "Unknown";
};

export { getConnectorName };
