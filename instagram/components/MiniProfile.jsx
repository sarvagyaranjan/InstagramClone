import React from 'react'
import Suggestions from './Suggestions'
import { useSession, signIn, signOut } from 'next-auth/react'


function MiniProfile() {
  const {data:session} = useSession()
  return (
    <>
    
         <div className='flex items-center space-x-5 mt-14 ml-10'>
        <img className='rounded-full border p-[2px] w-16 h-16' src={session?.user?.image}  alt="profile picture" />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'> {session?.user?.name}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
        </div>
        <button onClick={()=>signOut()} className='text-blue-400 text-sm font-semibold hover:text-blue-700'>
            Sign Out
        </button>

        
        </div></>
   
    
  )
}

export default MiniProfile