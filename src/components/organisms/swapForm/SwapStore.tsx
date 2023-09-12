"use client";

import { create } from "zustand";

import { UiToken } from "@src/libs/web3/tokens";

import type { TransactionRequest } from "@ethersproject/providers";

type SwapState = {
  loading: boolean;
  amount0: string;
  amount1: string;
  token0?: UiToken;
  token1?: UiToken;
  txn?: TransactionRequest;
};

type Action<T> = (param: T) => void;

type SwapActions = {
  setLoading: Action<boolean>;
  setAmount0: Action<string>;
  setAmount1: Action<string>;
  setToken0: Action<UiToken | undefined>;
  setToken1: Action<UiToken | undefined>;
  setTxn: Action<TransactionRequest | undefined>;
  resetState: () => void;
};

const useSwapStore = create<SwapState & SwapActions>((set) => ({
  loading: false,
  amount0: "",
  amount1: "",
  token0: undefined,
  token1: undefined,
  txn: undefined,
  resetState: () => set({ loading: false, amount0: "", amount1: "", token0: undefined, token1: undefined, txn: undefined }),
  setLoading: (state) => set({ loading: state }),
  setAmount0: (amount) => set({ amount0: amount }),
  setAmount1: (amount) => set({ amount1: amount }),
  setToken0: (token) => set({ token0: token }),
  setToken1: (token) => set({ token1: token }),
  setTxn: (txn) => set({ txn: txn }),
}));

export { useSwapStore };
