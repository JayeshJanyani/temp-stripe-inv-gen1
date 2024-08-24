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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import AddNewBusiness from "@/components/add-new-business/AddNewBusiness";
import { addAPIKey } from "@/utils/actions/databaseAction";
import AddNewBusinessBtn, { SearchBtn } from "@/components/custom-buttons/CustomButtons";

function SearchByEmail({ businessDataList, searchCheckoutByEmail }) {

  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    console.log("searchCheckoutByEmail", selectedBusiness)
    const result = await searchCheckoutByEmail(searchEmail, selectedBusiness);
    console.log(result)
    setSearchResult(result);
  }
  const handleSubmit = async (api, businessName, businessAddress) => {
    console.log("Submitted")
    const response = await addAPIKey(api, businessName, businessAddress);
    if (!response?.success) {
      throw new Error(response.error);
    }
  }

  return (
    <div className="flex flex-col rounded-md mx-auto w-full h-svh ">

      <div className="flex flex-col gap-4">
        <Dialog>
          <DialogTrigger asChild>
            {/* <AddNewBusinessBtn /> */}
            <Button className='bg-emerald hover:bg-emerald/80 dark:bg-mint/80 dark:hover:bg-emerald text-white text-md px-5 flex items-center gap-2'>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 9L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" stroke-width="2" />
              </svg>
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Business</DialogTitle>
              <DialogDescription>
                Add your stripe API key here to start using the platform.
              </DialogDescription>
            </DialogHeader>
            <AddNewBusiness handleSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <ApiSelection businessDataList={businessDataList} setSelectedBusiness={setSelectedBusiness} />

      <div >
        <Card className="h-fit w-full border border-red-600 flex flex-col px-5">
          <div className="flex items-center py-4 gap-2">
            <Input
              placeholder="Filter emails..."
              value={searchEmail}
              onChange={(event) => setSearchEmail(event.target.value)}
              className="min-w-[280px]"
            />
            <Button className='bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2' onClick={handleSearch}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Search
            </Button>
          </div>
          <DataTable columns={columns} data={searchResult} selectedBusiness={selectedBusiness} />
        </Card>
      </div>

    </div>
  )
}

export default SearchByEmail