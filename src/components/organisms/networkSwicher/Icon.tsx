import Image from "next/image";

import { SupportedChainId } from "@src/libs/web3/chains";
import { ethUrl } from "@src/libs/web3/tokens";

type IconProps = {
  chainId: SupportedChainId;
};

function Icon({ chainId }: IconProps) {
  const network = {
    1: "Mainnet",
    5: "Goerli",
    11155111: "Sepolia",
  };

  return (
    <div className="relative">
      <Image src={ethUrl} alt={network[chainId] || "Mainnet"} width={32} height={32} />
      {chainId === 1 || (
        <div className="absolute left-1/2 top-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-white">
          {network[chainId].substring(0, 1)}
        </div>
      )}
    </div>
  );
}

export { Icon };
