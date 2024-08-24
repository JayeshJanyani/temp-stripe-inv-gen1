'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/utils/actions/authAction";
import { getSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function UserDropdown({user}) {
    const router = useRouter()

    async function handleSignOut () {
        const supabase = await getSupabaseBrowserClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { success: false, message: error.message || 'Error signing out' };
        }
        router.push('/')
        return { success: true, message: 'Signed out successfully' };
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    {user.user_metadata.avatar_url ?
                     <AvatarImage src={user.user_metadata.avatar_url} /> : 
                     <AvatarImage src="https://github.com/shadcn.png" />}

                    <AvatarFallback>{user.user_metadata.full_name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={()=>handleSignOut()} className="ps-4">
                    SignOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
