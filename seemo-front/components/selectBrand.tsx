"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectBrand({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a brand" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Brands</SelectLabel>
          <SelectItem value="companyA">Company A</SelectItem>
          <SelectItem value="companyB">Company B</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
