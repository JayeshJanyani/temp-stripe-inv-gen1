'use client'
import { login, signup, loginWithGoogle } from '@/utils/actions/authAction'


export default function LoginPage() {

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
      <div>
        <button onClick={()=>loginWithGoogle()} className="bg-red-500 text-white rounded-md p-2 my-2 px-10">Log in with Google</button>
      </div>
    </>
  )
}