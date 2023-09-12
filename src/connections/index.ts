import { ConnectionType } from "./ConnectionType";
import { metaMaskConnection } from "./MetaMaskConnection";
import { networkConnection } from "./NetworkConnection";
import { walletConnectConnection } from "./WalletConnectConnection";

function getConnection(c: ConnectionType) {
  switch (c) {
    case ConnectionType.METAMASK:
      return metaMaskConnection;
    case ConnectionType.NETWORK:
      return networkConnection;
    case ConnectionType.WALLET_CONNECT:
      return walletConnectConnection;
  }
}

export * from "./ConnectionType";
export * from "./MetaMaskConnection";
export * from "./NetworkConnection";
export * from "./WalletConnectConnection";

export { getConnection };
