"use server"

import createSupabaseServerClient from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';
import { redirect } from "next/navigation";
import {getUser} from "@/utils/supabase/getUser"



export async function addAPIKey(api, businessName, businessAddress) {
    console
    if(!api || !businessName || !businessAddress){
        return { success: false, error: "All fields are required" };
    }

    const supabase = await createSupabaseServerClient()
    const user = await supabase.auth.getUser();
    console.log("user",user)
    
    const { data, error } = await supabase.from("userdetails").insert({
        id: uuidv4(),
        user_id: user.data.user.id,
        user_email: user.data.user.email,
        business_name: businessName,
        business_address: businessAddress,
        api_key: api,
    });
    
    if (error) {
        console.error("Error inserting API:", error);
        return { success: false, error: error.message };
    }
    
    redirect('/dashboard')
    return { success: true, data };
}

export async function getAPIKey() {
    
    const supabase = await createSupabaseServerClient();
    const user = await supabase.auth.getUser();
    console.log(user.data.user.id)
    const { data, error } = await supabase.from("userdetails").select("api_key, business_name, business_address").eq("user_id", user.data.user.id);
    console.log(data)
    return data;
}