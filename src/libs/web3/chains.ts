import { AlchemyKey, InfuraKey } from "@src/libs/env";

import type { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

export type SupportedChainId = 1 | 5 | 11155111;

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (chainInformation && isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network: string) => (InfuraKey ? `https://${network}.alchemyapi.io/v2/${InfuraKey}` : undefined);
const getAlchemyUrlFor = (network: string) => (AlchemyKey ? `https://${network}.infura.io/v3/${AlchemyKey}` : undefined);

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation };

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: [getInfuraUrlFor("mainnet"), getAlchemyUrlFor("eth-mainnet"), "https://cloudflare-eth.com"].filter(Boolean),
    name: "Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://etherscan.io"],
  },
};

export const TESTNET_CHAINS: ChainConfig = {
  5: {
    urls: [getInfuraUrlFor("goerli"), getAlchemyUrlFor("eth-goerli")].filter(Boolean),
    name: "Görli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  11155111: {
    urls: [getInfuraUrlFor("sepolia"), getAlchemyUrlFor("eth-sepolia")].filter(Boolean),
    name: "Sepolia",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)]?.urls || [];

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

export const getURL = (chainId: SupportedChainId) => {
  return CHAINS[chainId]?.urls[0];
};
