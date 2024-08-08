import React from 'react'
// import AddNewBusiness from './(subComponents)/add-new-business'
import { ModeToggle } from '@/components/theme/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AddNewBusiness } from '@/components/add-new-business/AddNewBusiness'
function HeaderNavBar() {


  const handleSubmit = async (api, businessName, businessAddress) => {
    console.log("Submitted")
    const response = await addAPIKey(api, businessName, businessAddress);
    if (!response.success) {
      throw new Error(response.error);
    }
  }
  return (
    <header className="fixed top-0 left-auto w-full mt-4 z-50 ">
      <div className="container md:px-20 lg:px-52 w-full ">
        <div className="flex justify-between items-center px-4 py-3 w-full bg-white/40 dark:bg-black/40 backdrop-filter backdrop-blur-lg rounded-full border shadow-sm">
          <div className="flex items-center gap-1 pl-4">
            {/* <FileSpreadsheet className="text-emerald h-6 w-6" /> */}
            <h2 className="scroll-m-20 text-md font-bold tracking-tight text-center">
              Invoice Generator
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            {/* <AddNewBusiness /> */}
            {/* <SignOutButton /> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderNavBar