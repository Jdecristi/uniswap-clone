"use client";

import { Button, WalletConnector } from "@src/components";
import { useAlphaRouter } from "@src/hooks";
import { useTokenStore, useWeb3 } from "@src/state";

import { useSwapStore } from "./SwapStore";

function SwapButton() {
  const { account, chainId, provider } = useWeb3();
  const { loading, amount0, amount1, token0, token1, txn, setLoading, resetState } = useSwapStore();
  const { swap } = useAlphaRouter({ chainId, provider });
  const { tokenBalances } = useTokenStore();

  const disabled = (() => {
    if (loading) return "Loading...";
    if (!token0 || !token1) return "Select a Token";
    if (!amount0 || Number(amount0) === 0) return `Enter ${token0.symbol} Amount`;
    if (token0 && amount0 > tokenBalances[token0.symbol]!) return `Insufficent ${token0.symbol} amount`;
    if (!txn) return "Swap";

    return false;
  })();

  const handleClick = async () => {
    if (!disabled) {
      console.log(amount0, amount1, token0, token1);

      try {
        setLoading(true);
        const txnResponse = await swap(txn!, token0!);
        console.log(txnResponse);
        resetState();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return account ? (
    <Button
      size="lg"
      variant="primary"
      type="submit"
      className="w-full rounded-xl p-8 text-2xl disabled:bg-secondary disabled:text-accent disabled:opacity-100"
      disabled={disabled ? true : false}
      onClick={handleClick}
    >
      {disabled || "Swap"}
    </Button>
  ) : (
    <WalletConnector
      trigger={
        <Button size="lg" className="w-full rounded-xl p-8 text-2xl">
          Connect Wallet
        </Button>
      }
    />
  );
}

export { SwapButton };
