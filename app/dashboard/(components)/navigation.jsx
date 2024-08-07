"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import AddNewBusiness from "./(subComponents)/add-new-business"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { addAPIKey } from "@/utils/actions/databaseAction";

export function NavigationMenuDemo() {
    return (
        <div className='flex flex-col justify-center w-full p-4 shadow-md'>
            <NavigationMenu >
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='bg-[#A17DF7] hover:bg-[#A17DF7]/80 text-white text-lg px-5 flex items-center gap-2'>

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 9L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                    Add new business</Button>
                            </DialogTrigger>
                            <DialogChild />
                        </Dialog>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export function DialogChild() {

    const handleSubmit = async (api, businessName, businessAddress) => {
        console.log("Submitted")
        const response = await addAPIKey(api, businessName, businessAddress);
        if(!response.success){
            throw new Error(response.error);
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add New Business</DialogTitle>
                <DialogDescription>
                    Add your stripe API key here to start using the platform.
                </DialogDescription>
            </DialogHeader>
            <AddNewBusiness handleSubmit={handleSubmit} />
           
        </DialogContent>
    )
}
