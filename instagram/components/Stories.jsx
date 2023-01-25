import React, {useEffect, useState} from 'react'
import faker from 'faker'
import Story from './Story'
import { useSession } from 'next-auth/react'
function Stories() {
    
    const [suggestions, setSuggestions ] = useState([])
const {data:session} = useSession()

    useEffect(()=>{
        // 
        const suggestions = [...Array(20)].map((_, i)=>({
            ...faker.helpers.contextualCard(),
            id: i,
        }) );
        setSuggestions(suggestions);
    }, [])

  return (
    <div className='flex scrollbar-thin scrollbar-thumb-black space-x-2 p-6 mt-8 border-gray-200 border rounded-sm overflow-scroll '>
{session && (
    <Story username= {session?.user?.name} img={session?.user?.image}/>
)}
        {suggestions.map(profile=>(
            <Story key={profile.id} img={" https://images.unsplash.com/photo-1674368777653-bc2bca1c30c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60https://images.unsplash.com/photo-1674368777653-bc2bca1c30c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"} username={profile.username} />
        ))}
     
    </div>
  )
}

export default Stories