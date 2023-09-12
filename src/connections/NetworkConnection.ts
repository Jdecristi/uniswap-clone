import { initializeConnector } from "@web3-react/core";
import { Network } from "@web3-react/network";

import { ConnectionType } from "@src/connections";
import { URLS } from "@src/libs/web3/chains";

import type { Connection } from "@src/connections";

const [networkConnector, networkConnectorHooks] = initializeConnector<Network>((actions) => new Network({ actions, urlMap: URLS }));

const networkConnection: Connection = {
  getName: () => "Network",
  connector: networkConnector,
  hooks: networkConnectorHooks,
  type: ConnectionType.NETWORK,
};

export { networkConnection, networkConnector, networkConnectorHooks };
