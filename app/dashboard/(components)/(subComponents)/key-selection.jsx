import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectList({businessDataList, onChange}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="min-w-[280px]">
        <SelectValue placeholder="Select the API Key" />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectGroup >
          <SelectLabel>Choose Business Name</SelectLabel>
          {businessDataList?.map((key) => (
          <SelectItem key={key.id} value={key}>{key.business_name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
