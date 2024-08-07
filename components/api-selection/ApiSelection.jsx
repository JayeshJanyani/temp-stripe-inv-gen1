import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectList } from "@/app/dashboard/(components)/(subComponents)/key-selection";
function ApiSelection({setSelectedBusiness, businessDataList}) {
  return (
    <div>
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle className="font-serif">Select the business</CardTitle>
          <CardDescription>Select the business you want to generate invoice for</CardDescription>
        </CardHeader>

        <CardContent>
        <SelectList className="border border-blue-400" businessDataList={businessDataList} onChange={setSelectedBusiness} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ApiSelection