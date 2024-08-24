'use client'
import { login, signup, loginWithGoogle } from '@/utils/actions/authAction'
import Image from 'next/image';
import  {getSupabaseBrowserClient} from '@/utils/supabase/client';



export default function LoginPage() {

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
    <>
      {/* <form className="flex min-h-screen flex-col items-center p-24">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className="text-black bg-gray-200 rounded-md p-2 w-1/2 m-2" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className="text-black bg-gray-200 rounded-md p-2 w-1/2 m-2" />
        <button formAction={login} className="bg-blue-200 text-black rounded-md p-2 my-2 px-10">Log in</button>
        <button formAction={signup} className="bg-blue-200 text-black rounded-md p-2 my-2 px-10">Sign up</button>

      </form> */}
      {/* <div>
        <button onClick={()=>loginWithGoogle()} className="bg-red-500 text-white rounded-md p-2 my-2 px-10">Log in with Google</button>
      </div> */}


      <a
        className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
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

    </>
  )
}