"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components";
import { useWeb3 } from "@src/state";

import { Icon } from "./Icon";

function NetworkSwitcher() {
  const { chainId, connector } = useWeb3();

  const switchChain = async (value: string) => {
    connector.activate(Number(value));
  };

  return (
    <Select onValueChange={switchChain}>
      <SelectTrigger className="rounded-xl border-none ring-0 ring-offset-0 hover:bg-accent/10 focus:ring-0 focus:ring-ring focus:ring-offset-0">
        <SelectValue>
          <Icon chainId={chainId || 1} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="1">
          <div className="flex items-center gap-2">
            <Icon chainId={1} /> Mainnet
          </div>
        </SelectItem>
        <SelectItem value="5">
          <div className="flex items-center gap-2">
            <Icon chainId={5} /> Goerli
          </div>
        </SelectItem>
        <SelectItem value="11155111">
          <div className="flex items-center gap-2">
            <Icon chainId={11155111} /> Sepolia
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export { NetworkSwitcher };
