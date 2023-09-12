import { useEffect } from "react";

import { Connection, ConnectionType, getConnection, networkConnection } from "@src/connections";
import { useUserStore } from "@src/state";

async function connect(connection: Connection) {
  try {
    if (connection.type === ConnectionType.NETWORK && connection.connector.connectEagerly) {
      await connection.connector.connectEagerly();
    } else {
      await connection.connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
}

function useEagerlyConnect() {
  const { selectedWallet, setSelectedWallet } = useUserStore();

  let selectedConnection: Connection | undefined;
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet);
    } catch {
      setSelectedWallet(undefined);
    }
  }
  useEffect(() => {
    connect(networkConnection);

    if (selectedConnection) {
      connect(selectedConnection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useEagerlyConnect };
