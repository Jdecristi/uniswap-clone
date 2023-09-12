"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components";
import { metaMaskConnection, walletConnectConnection } from "@src/connections";
import { useUserStore, useWeb3 } from "@src/state";

import type { Connection } from "@src/connections";
import type { ReactNode } from "react";

type WalletConnectorProps = {
  trigger: ReactNode;
  onWalletConnected?: () => void;
};

function WalletConnector({ trigger, onWalletConnected }: WalletConnectorProps) {
  const { connector } = useWeb3();
  const { selectedWallet, setSelectedWallet } = useUserStore();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const switchConnector = async (newConnector: Connection) => {
    try {
      await newConnector.connector.activate();
      setSelectedWallet(newConnector.type);
    } catch (err) {
      console.log(err);
    } finally {
      if (onWalletConnected) onWalletConnected();
      toggleDialog();
    }
  };

  const disconnectWallet = () => {
    if (connector.deactivate) connector.deactivate();
    connector.resetState();
    setSelectedWallet(undefined);
    toggleDialog();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild suppressHydrationWarning>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedWallet ? "Switch Wallet" : "Connect Wallet"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Button
            variant="secondary"
            size="lg"
            className="flex items-center justify-between rounded-md py-6 pl-5 pr-2"
            onClick={() => switchConnector(metaMaskConnection)}
          >
            Metamask
            <Image
              className="rounded-md"
              height={35}
              width={35}
              src="https://app.uniswap.org/static/media/metamask-icon.c8b2298e68e585a7f4d9c7b7e6320715.svg"
              alt="Metamask"
            />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex items-center justify-between rounded-md py-6 pl-5 pr-2"
            onClick={() => switchConnector(walletConnectConnection)}
          >
            WalletConnect
            <Image
              className="rounded-md"
              height={35}
              width={35}
              src="https://app.uniswap.org//static/media/walletconnect-icon.bd207ef6f3632304cd1b6e772271cb43.svg"
              alt="WalletConnect"
            />
          </Button>
          {selectedWallet && (
            <Button variant="outline" size="lg" className="flex items-center justify-start rounded-md py-6 pl-5 pr-2" onClick={disconnectWallet}>
              Disconnect Wallet
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { WalletConnector };
export type { WalletConnectorProps };
