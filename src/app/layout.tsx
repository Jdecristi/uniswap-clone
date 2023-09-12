import { Inter } from "next/font/google";

import { HelpDialog } from "@src/components";
import { NavBar } from "@src/components/organisms/NavBar";
import { StateUpdaters, ThemeContextProvider, Web3ContextProvider } from "@src/state";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@src/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeContextProvider attribute="class" defaultTheme="dark" enableSystem>
          <Web3ContextProvider>
            <StateUpdaters />
            <main className="h-screen overflow-hidden bg-radial-from-t from-primary dark:from-primary/50">
              <NavBar />
              {children}
            </main>
            <HelpDialog />
          </Web3ContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
