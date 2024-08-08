import React from 'react'
import { Button } from '@/components/ui/button'

export default function AddNewBusinessBtn({children}) {
    return (<Button className='bg-emerald hover:bg-emerald/80 dark:bg-mint/80 dark:hover:bg-emerald text-white text-md px-5 flex items-center gap-2'>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 9L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" stroke-width="2" />
        </svg>
        Add new business
        {children}</Button>
    )
}

export function SearchBtn() {
    return (
        <Button className='bg-emerald hover:bg-emerald/80 text-white text-md px-5 flex items-center gap-2'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Search
        </Button>
    )
}