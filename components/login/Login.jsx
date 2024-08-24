'use client'
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import  {getSupabaseBrowserClient} from '@/utils/supabase/client';
import Image from "next/image";

export const LoginModal = () => {

    const supabase = getSupabaseBrowserClient();

    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-emerald hover:bg-emerald/80 text-white text-md px-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Login/SignUp</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                {/* //Design a login form with google login button */}
                <div className="flex flex-col gap-2">
                    <a
                        className='px-7 py-2 my-5 text-white font-medium text-sm leading-snug rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
                        style={{ backgroundColor: '#3b5998' }}
                        onClick={loginWithGoogle}
                        role='button'
                    >
                        <Image
                            className='pr-2'
                            src='/images/google.svg'
                            alt=''
                            style={{ height: '2rem' }}
                            width={35}
                            height={35}
                        />
                        Continue with Google
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    )
}