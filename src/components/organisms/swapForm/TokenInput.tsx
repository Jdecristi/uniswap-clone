"use client";

import { ChangeEvent } from "react";

import { Label, NumericalInput } from "@src/components";
import { useAlphaRouter } from "@src/hooks";
import { useTokenStore, useWeb3 } from "@src/state";

import { useSwapStore } from "./SwapStore";
import { TokenSelector } from "./TokenSelector";

type TokenInputProps = {
  type: "input" | "output";
};

function TokenInput({ type }: TokenInputProps) {
  const { account, chainId, provider } = useWeb3();
  const { tokenBalances } = useTokenStore();
  const { amount0, amount1, token0, token1, setLoading, setAmount0, setAmount1, setTxn } = useSwapStore();
  const { getExactInputRoute, getExactOutputRoute, getQuote, getRouteTransaction } = useAlphaRouter({ chainId, provider });

  const amount = type == "input" ? amount0 : amount1;
  const token = type == "input" ? token0 : token1;
  const quoteToken = type == "input" ? token1 : token0;
  const setAmount = type == "input" ? setAmount0 : setAmount1;
  const setQuoteAmount = type == "input" ? setAmount1 : setAmount0;

  const tokenBalance = token ? tokenBalances[token.symbol]?.substring(0, 5) : "";

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = String(Number(e.target.value));
    setAmount(e.target.value);

    if (newAmount === String(Number(amount))) return;
    setQuoteAmount("");
    if (!e.target.value) return;

    setLoading(true);

    if (type === "input") {
      const route = await getExactInputRoute(token, quoteToken, newAmount);

      if (route) {
        setQuoteAmount(getQuote(route));
        setTxn(getRouteTransaction(route, account!));
      }
    } else {
      const route = await getExactOutputRoute(token, quoteToken, newAmount);

      if (route) {
        setQuoteAmount(getQuote(route));
        setTxn(getRouteTransaction(route, account!));
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-secondary p-4">
      <div className="mb-1 flex items-center justify-between">
        <NumericalInput
          onChange={handleInput}
          value={amount}
          className="border-none bg-transparent text-4xl placeholder:text-accent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <TokenSelector type={type} />
      </div>
      <div className="h-5 text-right">{account && token ? <Label className="text-accent">Balance: {tokenBalance || "0"}</Label> : null}</div>
    </div>
  );
}
export { TokenInput };
