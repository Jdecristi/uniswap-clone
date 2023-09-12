"use client";

import { ChevronDown, Loader2, Search } from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@src/components";
import { debounce } from "@src/libs/utils";
import { useTokenStore, useWeb3 } from "@src/state";

import { useSwapStore } from "./SwapStore";

import type { UiToken } from "@src/libs/web3/tokens";

type TokenSelectorProps = {
  type: "input" | "output";
};

const TokenSelector = forwardRef<HTMLButtonElement, TokenSelectorProps>(({ type }, ref) => {
  const { account } = useWeb3();
  const { tokens, setTokenBalance } = useTokenStore();
  const { token0, token1, setAmount0, setAmount1, setToken0, setToken1 } = useSwapStore();

  const token = type === "input" ? token0 : token1;
  const quoteToken = type === "input" ? token1 : token0;
  const setAmount = type === "input" ? setAmount0 : setAmount1;
  const setToken = type === "input" ? setToken0 : setToken1;

  const [open, setOpen] = useState<boolean>(false);
  const [searchedTokens, setSearchedTokens] = useState<UiToken[]>(tokens);

  useEffect(() => setSearchedTokens(tokens), [tokens]);

  const selectToken = async (newToken: UiToken) => {
    if (account) setTokenBalance(newToken);

    setAmount("");
    setToken(newToken);
    setOpen(false);
  };

  const searchToken = (input: string) => {
    if (!input) return setSearchedTokens(tokens);

    const str = input.toLowerCase();
    const newTokens = tokens.filter(
      ({ name, symbol, address }) => address === input || name.toLowerCase().includes(str) || symbol.toLowerCase().includes(str)
    );
    setSearchedTokens(newTokens);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild suppressHydrationWarning>
        {token ? (
          <Button
            size="sm"
            variant="accent"
            className="flex gap-2 whitespace-nowrap rounded-full bg-accent/40 px-1 py-0 hover:bg-accent/60"
            ref={ref}
          >
            <Image src={token.logoURI} alt={token.name ?? ""} width="24" height="24" className="rounded-full" />
            {token.symbol}
            <ChevronDown width={50} />
          </Button>
        ) : (
          <Button size="sm" variant="primary" className="flex gap-2 whitespace-nowrap rounded-full py-0 pl-3 pr-1" ref={ref}>
            Select token <ChevronDown />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="px-0 pb-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="px-5">Select a token</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 px-4">
          <div className="flex items-center rounded-xl border px-3">
            <Search className="text-accent" />
            <Input
              placeholder="Search name or paste address"
              className="border-none bg-transparent placeholder:text-accent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              onChange={debounce((e: MouseEvent) => searchToken((e.target as HTMLInputElement).value), 100)}
            />
          </div>
        </div>
        <div className="flex h-[500px] flex-col overflow-scroll px-2 scrollbar scrollbar-track-transparent scrollbar-thumb-secondary">
          {!tokens.length ? (
            <Loader2 className="mx-auto mt-12 animate-spin" size={16} />
          ) : (
            !!searchedTokens.length || (
              <Label className="mx-auto mt-12">There are no tokens that fit you description. Please search by Symbol, Name or paste an Address</Label>
            )
          )}
          {searchedTokens.map((token) => (
            <Button
              key={token.symbol}
              variant="ghost"
              className="flex justify-start gap-5 py-6"
              disabled={token === quoteToken}
              onClick={() => selectToken(token)}
            >
              <Image src={token.logoURI} alt={token.name ?? ""} width="32" height="32" className="rounded-full" />
              <div className="flex flex-col items-start">
                <Label className="cursor-pointer text-base">{token.name}</Label>
                <Label className="cursor-pointer text-xs text-accent">{token.symbol}</Label>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
});

export { TokenSelector };
export type { TokenSelectorProps };
