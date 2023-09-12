import type { Web3ReactHooks } from "@web3-react/core";
import type { Connector } from "@web3-react/types";

enum ConnectionType {
  METAMASK = "METAMASK",
  WALLET_CONNECT = "WALLET_CONNECT",
  NETWORK = "NETWORK",
}

type Connection = {
  getName(): string;
  connector: Connector;
  hooks: Web3ReactHooks;
  overrideActivate?: () => boolean;
  type: ConnectionType;
};

export { ConnectionType };
export type { Connection };
