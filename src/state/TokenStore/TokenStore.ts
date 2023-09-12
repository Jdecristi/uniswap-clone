import { create } from "zustand";

import { getTokenBalance } from "@src/libs/web3/tokens";

import type { TokenBalance, UiToken } from "@src/libs/web3/tokens";
import type { Web3Context } from "@src/state";

type TokenState = {
  web3Context: Web3Context;
  tokens: UiToken[];
  tokenBalances: TokenBalance;
};

type TokenStoreActions<T> = (prop: T) => void;

type TokenActions = {
  setWeb3Context: (context: Web3Context) => void;
  setTokens: (tokens: UiToken[]) => void;
  setTokenBalance: TokenStoreActions<UiToken>;
};

type SetTokenStateType = (
  partial: TokenState | Partial<TokenState> | ((state: TokenState) => TokenState | Partial<TokenState>),
  replace?: boolean
) => void;
type TokenStateFnType = () => TokenState;

const useTokenStore = create<TokenState & TokenActions>((set, get) => ({
  web3Context: {} as Web3Context,
  tokens: [],
  tokenBalances: {},
  setWeb3Context: (web3Context) => set({ web3Context }),
  setTokens: (tokens) => set({ tokens }),
  setTokenBalance: async (token) => set({ tokenBalances: await setTokenBalances(get(), token) }),
}));

const setTokenBalances = async (state: TokenState & TokenActions, token: UiToken) => {
  const { tokenBalances, web3Context } = state;
  const { account, provider } = web3Context;

  try {
    if (!account) throw new Error("Wallet address is undefined");
    if (!provider) throw new Error("Web3 provider is undefined");

    const newBalance = await getTokenBalance(token, account, provider);

    const newTokenBalances = { ...tokenBalances };
    newTokenBalances[token.symbol] = newBalance;

    return newTokenBalances;
  } catch (err) {
    console.log(err);
    return tokenBalances;
  }
};

export { useTokenStore };
export type { SetTokenStateType, TokenState, TokenStateFnType };
