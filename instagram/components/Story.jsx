import React from 'react'

function Story({img, username}) {
  return (
    <div>
        <img src={img} className='h-14 w-14 rounded-full cursor-pointer p-[1.5px] border-2 hover:scale-110 transition-transform duration-200 ease-out border-red-500' alt="profile-picture" />
        <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  )
}

export default Story