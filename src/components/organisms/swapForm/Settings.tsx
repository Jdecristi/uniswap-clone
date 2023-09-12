"use client";

import { Settings as SettingsIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui";

type SettingsProps = {
  slippage: number;
  deadline: number;
};

function Settings({ deadline, slippage }: SettingsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild suppressHydrationWarning>
        <Button variant="ghost" size="icon">
          <SettingsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-4 py-2" align="end">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between">
                <Label className="text-base text-gray-500">Max Slippage</Label>
                <Label className="text-base">{slippage}%</Label>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center rounded-xl border px-5 py-1">
                <Input
                  id="maxSlippage"
                  placeholder="0.5"
                  className="col-span-2 h-8 border-none bg-transparent text-right focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                <Label>%</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between">
                <Label className="text-base text-gray-500">Transaction Deadline</Label>
                <Label className="text-base">{deadline}m</Label>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center rounded-xl border px-5 py-1">
                <Input
                  id="maxWidth"
                  placeholder="30"
                  className="col-span-2 h-8 border-none bg-transparent text-right focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                <Label>minutes</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PopoverContent>
    </Popover>
  );
}

export { Settings };
export type { SettingsProps };
