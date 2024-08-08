"use client";

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function AddNewBusiness({handleSubmit}) {

    const [api, setApi] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");

    return (
        <>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Business Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="Enter your business name"
                        className="col-span-3"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        API Key
                    </Label>
                    <Input
                        id="username"
                        placeholder="Enter your stripe API key"
                        className="col-span-3"
                        value={api}
                        onChange={(e) => setApi(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Business Address
                    </Label>
                    <Textarea
                        placeholder="Enter your business address"
                        className="h-[150px] w-[280px]"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose>
                    <Button type="submit" className="bg-emerald hover:bg-[#A17DF7]/80 text-white from-neutral-700"
                    onClick={()=>handleSubmit(api, businessName, businessAddress)}>Save changes</Button>
                </DialogClose>
            </DialogFooter>
        </>
    )
}

export default AddNewBusiness