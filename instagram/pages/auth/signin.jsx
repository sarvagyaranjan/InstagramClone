import React from 'react'
import { getProviders, signOut, signIn as SignIntoProvider, useSession } from "next-auth/react"
// import Header from '../../components/Header';
import Header from '../../components/Header';

// browser..
function signIn({ providers }) {
     
    return (
        <>

        <Header/>
        <div className='flex flex-col items-center justify-center    px-14 text-center'>
            <img className='w-80' src="https://links.papareact.com/ocw" alt="" />
            <p className='font-xs italic'>
                This is not a real app, it is built for educational purposes.
            </p>
              <div className='mt-10'>
               {Object.values(providers).map((provider) => (
                <div key={provider.name} >
                    <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => SignIntoProvider(provider.id, {callbackUrl:'http://localhost:3000'})}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
        </div>
        
      
         
        </>
    )
}
// server..
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }





}


export default signIn