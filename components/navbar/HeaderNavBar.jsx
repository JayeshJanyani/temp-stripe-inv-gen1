import React from 'react'
import { ModeToggle } from '@/components/theme/ThemeSwitcher'
import {UserDropdown} from '@/components/navbar/UserDropdown'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AddNewBusiness } from '@/components/add-new-business/AddNewBusiness'
import { getUser } from '@/utils/supabase/getUser'
import { LoginModal } from '@/components/login/Login'
async function HeaderNavBar() {
  const {data: {user}} = await getUser()

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
            <h2 className="scroll-m-20 text-md font-bold tracking-tight text-center">
              Invoice Generator
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="flex items-center gap-2">
            {user ? <UserDropdown user={user}/> : <LoginModal/>}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderNavBar