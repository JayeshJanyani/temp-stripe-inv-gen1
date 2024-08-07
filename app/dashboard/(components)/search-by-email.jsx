"use client"
import React from 'react'
import { SelectList } from './(subComponents)/key-selection';
import { DataTable } from '@/app/dashboard/(components)/(subComponents)/data-table';
import { columns } from '@/app/dashboard/(components)/(subComponents)/column';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import ApiSelection from '@/components/api-selection/ApiSelection';

function SearchByEmail({ businessDataList, searchCheckoutByEmail}) {

  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    console.log("searchCheckoutByEmail", selectedBusiness)
    const result = await searchCheckoutByEmail(searchEmail, selectedBusiness);
    console.log(result)
    setSearchResult(result);
  }

  return (
    <div className="flex flex-col rounded-md mx-auto items-center gap-8 w-full h-svh justify-center">

      <div className='border border-blue-400 w-1/3'>
      <Label>Select Business</Label>
      {/* <SelectList className="border border-blue-400" businessDataList={businessDataList} onChange={setSelectedBusiness} /> */}
      {/* Customer email search : {JSON.stringify(selectedBusiness)} */}
      </div>
      <ApiSelection businessDataList={businessDataList} setSelectedBusiness={setSelectedBusiness}/>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter emails..."
          value={searchEmail}
          onChange={(event) => setSearchEmail(event.target.value)}
          className="min-w-[280px]"
        />
        <Button className="bg-emerald" onClick={handleSearch}>Search</Button>
      </div>

      <div>
          <DataTable columns={columns} data={searchResult}/>
      </div> 

    </div>
  )
}

export default SearchByEmail