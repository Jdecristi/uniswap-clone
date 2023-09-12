import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ConnectionType } from "@src/connections";

type UserStoreState = {
  selectedWallet?: ConnectionType;
};

type Dispatch<T> = (param: T) => void;

type UserStoreActions = {
  setSelectedWallet: Dispatch<ConnectionType | undefined>;
};

const useUserStore = create<UserStoreState & UserStoreActions>()(
  persist(
    (set) => ({
      selectedWallet: undefined,
      setSelectedWallet: (selectedWallet) => set({ selectedWallet }),
    }),
    { name: "user-storage" }
  )
);

export { useUserStore };
