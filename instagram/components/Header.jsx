import Image from 'next/legacy/image'
import React from 'react'
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    
} from "@heroicons/react/outline"


import{ HomeIcon} from "@heroicons/react/solid"
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import {useRecoilState} from "recoil"
import {modalState} from "../atoms/modalAtoms"

function Header() {


    const {data: session} = useSession();
    // console.log(session)
    const router = useRouter();
    const [open, setOpen ] = useRecoilState(modalState)

   


    // console.log(session)


  return (
   <div className='shadow-sm border-b bg-white sticky-top-0 z-50'>

        
    <div className='flex justify-between md:items-center max-w-6xl mx-5 xl:mx-auto'>
        {/* Left */}

        <div onClick={()=>router.push('/')} className='relative h-24 w-24 hidden lg:inline-grid cursor-pointer' >

        <Image src="https://links.papareact.com/ocw"
        
           layout='fill' objectFit='contain'  />

        </div>

        <div onClick={()=>router.push('/')} className='relative w-10  lg:hidden flex-shrink-0 cursor-pointer'>
                <Image src="https://links.papareact.com/jjm"
        
           layout='fill' objectFit='contain'  />
             
        </div>
      


        {/* Mid - Search*/}
            <div className='max-w-xs'>
                    <div className=' relative mt-1 p-3 rounded-md '>
                    <div className='absolute inset-y-0  pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-500'/>
                    </div>

                <input type="text"  placeholder='Search' className='bg-gray-50 block-w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black'   />


            </div>

            </div>
        


        {/* Right */}
        
            <div className='flex items-center justify-end space-x-4'>
                 <HomeIcon onClick={()=>router.push('/')} className='navBtn hidden md:block'/>
                 <MenuIcon  className='h-6 cursor-pointer md:hidden'/>
                    {session?(
                        <>
                         <div className='relative navBtn'>
                 <PaperAirplaneIcon className='navBtn rotate-45 hidden md:block'/>
                    <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse'>3</div>
                 </div>
                 <PlusCircleIcon onClick={()=>setOpen(true)} className='navBtn  hidden md:block'/>
                 <UserGroupIcon className='navBtn hidden md:block'/>
                 <HeartIcon className='navBtn hidden md:block'/>

                 <img onClick={()=>signOut()} src={session.user.image} alt="profile pic" className='h-10 w-10 rounded-full cursor-pointer'/>

                     </>   
                        ):(
                            <button onClick={()=>signIn()}>Sign In</button>
                        )}
                


            </div>
           
        
    
        
        
    </div>
   </div>
  )
}

export default Header