import { useMemo } from "react";

import { ConnectionType, getConnection } from "@src/connections";
import { useUserStore } from "@src/state";

const SELECTABLE_WALLETS = [ConnectionType.METAMASK, ConnectionType.WALLET_CONNECT];

function useOrderedConnections() {
  const { selectedWallet } = useUserStore();

  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = [];

    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    if (selectedWallet) {
      orderedConnectionTypes.push(selectedWallet);
    }
    orderedConnectionTypes.push(...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet));

    // Add network connection last as it should be the fallback.
    orderedConnectionTypes.push(ConnectionType.NETWORK);

    return orderedConnectionTypes.map((connectionType) => getConnection(connectionType));
  }, [selectedWallet]);
}

export { useOrderedConnections };
