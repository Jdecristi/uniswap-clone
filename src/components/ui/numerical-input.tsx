"use client";

import { forwardRef } from "react";

import { Input } from "@src/components";

import type { ChangeEvent, InputHTMLAttributes } from "react";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const NumericalInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ value, onChange, ...rest }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/,/g, ".");

    if (input === "" || inputRegex.test(escapeRegExp(input))) {
      e.target.value = input;
      if (onChange) onChange(e);
    }
  };

  return <Input {...rest} placeholder="0" inputMode="decimal" value={value} onChange={handleChange} ref={ref} suppressHydrationWarning />;
});

export { NumericalInput };
