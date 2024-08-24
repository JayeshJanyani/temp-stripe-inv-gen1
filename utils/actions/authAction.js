'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../supabase/server'
import { getSupabaseBrowserClient } from '../supabase/client'
import { cookies } from 'next/headers'

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)
  console.log(error)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await getSupabaseBrowserClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { success: false, message: error.message || 'Error signing out' };
    }
    redirect('/')
    return { success: true, message: 'Signed out successfully' };
}

export async function loginWithGoogle(){
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `localhost:3000/auth/callback`,
    },
  });
}