"use client";

import { useEffect } from "react";

import { getTokens } from "@src/libs/web3/tokens";
import { useTokenStore, useWeb3 } from "@src/state";

function TokenStoreUpdater() {
  const context = useWeb3();
  const { setTokens, setWeb3Context } = useTokenStore();

  useEffect(() => {
    (async () => {
      setWeb3Context(context);
      const tokens = await getTokens(context.chainId || 1);
      if (tokens) setTokens(tokens);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.chainId]);

  return null;
}

export { TokenStoreUpdater };
