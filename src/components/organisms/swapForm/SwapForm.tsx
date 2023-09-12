"use client";

import { useEffect } from "react";

import { Label } from "@src/components";
import { useWeb3 } from "@src/state";

import { Settings } from "./Settings";
import { SwapButton } from "./SwapButton";
import { useSwapStore } from "./SwapStore";
import { SwitchButton } from "./SwitchButton";
import { TokenInput } from "./TokenInput";

function SwapForm() {
  const { account } = useWeb3();
  const { resetState } = useSwapStore();

  useEffect(() => resetState(), [account, resetState]);

  return (
    <div className="relative w-[90%] max-w-[480px] space-y-1.5 rounded-2xl border bg-popover p-2">
      <div className="mb-1 flex items-center justify-between px-2">
        <Label className="text-lg">Swap</Label>
        <Settings deadline={30} slippage={0.5} />
      </div>
      <TokenInput type="input" />
      <SwitchButton />
      <TokenInput type="output" />
      <SwapButton />
    </div>
  );
}

export { SwapForm };
