import { ArrowDown, Loader2 } from "lucide-react";

import { Button } from "@src/components";

import { useSwapStore } from "./SwapStore";

function SwitchButton() {
  const { loading, amount0, amount1, token0, token1, setAmount0, setAmount1, setToken0, setToken1 } = useSwapStore();

  const handleClick = () => {
    setAmount0(amount1);
    setAmount1(amount0);
    setToken0(token1);
    setToken1(token0);
  };

  return (
    <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-1">
      <Button variant="accent" size="icon" className="h-8 w-8 rounded-lg bg-accent/50 hover:outline-none" onClick={handleClick}>
        {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowDown size={16} />}
      </Button>
    </div>
  );
}

export { SwitchButton };
