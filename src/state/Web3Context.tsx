"use client";

import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { useMemo } from "react";

import { useEagerlyConnect, useOrderedConnections } from "@src/hooks";
import { SupportedChainId } from "@src/libs/web3/chains";

import type { Web3ReactHooks } from "@web3-react/core";
import type { Connector } from "@web3-react/types";
import type { FC, ReactNode } from "react";

type Web3ContextProviderProps = {
  children: ReactNode;
};

type Web3Context = ReturnType<typeof useWeb3>;

const Web3ContextProvider: FC<Web3ContextProviderProps> = ({ children }) => {
  useEagerlyConnect();
  const connections = useOrderedConnections();
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ hooks, connector }) => [connector, hooks]);
  const key = useMemo(() => connections.map((connection) => connection.getName()).join("-"), [connections]);

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  );
};

function useWeb3() {
  const context = useWeb3React();

  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3ContextProvider");
  }

  const chainId = context.chainId as SupportedChainId;

  return { ...context, chainId };
}

export { useWeb3, Web3ContextProvider };
export type { Web3Context };
