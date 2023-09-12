import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

import { ConnectionType } from "@src/connections";

import type { Connection } from "@src/connections";

const [metaMaskConnector, metaMaskConnectorHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

const metaMaskConnection: Connection = {
  getName: () => "Network",
  connector: metaMaskConnector,
  hooks: metaMaskConnectorHooks,
  type: ConnectionType.METAMASK,
};

export { metaMaskConnection, metaMaskConnector, metaMaskConnectorHooks };
