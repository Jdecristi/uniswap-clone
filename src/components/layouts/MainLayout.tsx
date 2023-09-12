import { NavBar } from "@src/components/organisms";

import type { FC, ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <main className="h-screen bg-gradient-to-b from-primary/50 dark:bg-slate-950">
    <NavBar />
    {children}
  </main>
);
