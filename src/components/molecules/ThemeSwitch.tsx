"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@src/components";

export function ThemeSwitch() {
  const { theme = "system", setTheme } = useTheme();

  const toggleDarkMode = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
