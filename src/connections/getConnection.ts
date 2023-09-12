import { ConnectionType } from "@src/connections";

import { metaMaskConnection } from "./MetaMaskConnection";
import { networkConnection } from "./NetworkConnection";
import { walletConnectConnection } from "./WalletConnectConnection";

function getConnection(c: ConnectionType) {
  switch (c) {
    case ConnectionType.METAMASK:
      return metaMaskConnection;
    case ConnectionType.WALLET_CONNECT:
      return walletConnectConnection;
    case ConnectionType.NETWORK:
      return networkConnection;
  }
}

export { getConnection };
