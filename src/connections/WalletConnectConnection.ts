import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

import { ConnectionType } from "@src/connections";
import { WalletConnectProjectId } from "@src/libs/env";
import { MAINNET_CHAINS } from "@src/libs/web3/chains";

import type { Connection } from "@src/connections";

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number);

const [walletConnectConnector, walletConnectConnectorHooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: WalletConnectProjectId || "",
        chains: [mainnet as number],
        optionalChains,
        showQrModal: true,
      },
    })
);

const walletConnectConnection: Connection = {
  getName: () => "WalletConnect",
  connector: walletConnectConnector,
  hooks: walletConnectConnectorHooks,
  type: ConnectionType.WALLET_CONNECT,
};

export { walletConnectConnection, walletConnectConnector, walletConnectConnectorHooks };
