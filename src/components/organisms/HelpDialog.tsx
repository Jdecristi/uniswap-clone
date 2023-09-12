"use client";

import { ShieldQuestionIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  WalletConnector,
} from "@src/components";
import { useUserStore } from "@src/state";

function HelpDialog() {
  const [hidden, setHidden] = useLocalStorage("hideHelpDialog", false);
  const [open, setOpen] = useState<boolean>(false);
  const { selectedWallet } = useUserStore();

  useEffect(() => {
    if (!hidden) setOpen(true);
  }, [hidden]);

  return open ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]" closeButton={false}>
        <DialogHeader>
          <DialogTitle className="text-left">Uniswap Clone</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p>
            The Uniswap Clone is a Web3 application. To fully utilize all its features, including swaps, you need to connect your Metamask or
            WalletConnect wallet.
          </p>
          <p>
            Don&apos;t have a wallet? Check out{" "}
            <Link className="text-primary-foreground" href="https://metamask.io/" target="blank">
              Metamask
            </Link>
          </p>
        </div>
        <div className="flex justify-end gap-5 pt-8">
          <Label htmlFor="hide">Don&apos;t show me this again</Label>
          <Switch id="hide" checked={hidden} onCheckedChange={() => setHidden(!hidden)} />
        </div>
        <div className="flex items-center justify-center gap-2">
          {selectedWallet ? (
            <Button className="w-full" onClick={() => setOpen(false)}>
              Continue
            </Button>
          ) : (
            <>
              <Button className="grow rounded-2xl" onClick={() => setOpen(false)}>
                Continue Without Connecting
              </Button>
              <WalletConnector
                trigger={
                  <Button variant="primary" className="grow rounded-2xl">
                    Connect Wallet
                  </Button>
                }
                onWalletConnected={() => setOpen(false)}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" className="fixed bottom-6 right-6" onClick={() => setOpen(true)}>
            <ShieldQuestionIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Help, I don&apos;t know whats goin on</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { HelpDialog };
