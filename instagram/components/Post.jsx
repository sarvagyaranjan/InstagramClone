import React, { useEffect, useState } from 'react'
import{
    BookmarkIcon, 
    ChatIcon, 
    DotsHorizontalIcon,
    EmojiHappyIcon, 
    HeartIcon, 
    PaperAirplaneIcon
} from "@heroicons/react/outline"

import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'
// import { isKeyObject } from 'util/types'
// import { async } from '@firebase/util'


function Post({id,username, userImg, img, caption}) {
    const {data:session} = useSession()
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]); 
    const [hasLiked, setHasLiked] = useState(false);



    


    useEffect(()=>
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot)=>

        setComments(snapshot.docs)),
    
    [db]
    )
    useEffect(()=>
        onSnapshot(query(collection(db, 'posts', id, 'likes'), orderBy('timestamp', 'desc')), (snapshot)=>

        setLikes(snapshot.docs)),
    
    [db, id]
    )

    const likePost = async () =>{

        if(hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.name))
        }

  await setDoc(doc(db, "posts", id,  "likes", session.user.name), {
    username:session.user.name

 
});
    }

    // console.log(session.user.name)


    useEffect(()=>{
        setHasLiked(likes.findIndex((like)=>like.name == session.user.name) !==-1)
    }, [likes])
    
    const sendComment  = async (e) =>{
        e.preventDefault();

        const commentToSend = comment;
        setComment('');


        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend, 
            username : session.user.name, 
            userImage : session.user.image,
            timestamp : serverTimestamp(), 
        })
    }
  return (
    <div className='bg-white my-7 border rounded-sm'>
       
        {/* HEader */}
        <div className='flex items-center p-5'>
            <img src={userImg} className='rounded-full h-12 w-12 border p-1 mr-3'  alt="" />
            <p className='flex-1 font-bold '>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>

        {/* Img */}

        <img src={img} className='object-cover w-full' alt="" />


        {/* Button */}
        {session && (
            <>
             <div className='flex justify-between px-4 py-4'>

              <div className='flex space-x-4'>
                {hasLiked?(
                    <HeartIconSolid onClick={()=>likePost()} className='btn text-red-500'/>
                ):(
            <HeartIcon onClick={()=>likePost()} className='btn '/>

                )}
            <ChatIcon className='btn'/>
            <PaperAirplaneIcon className='btn rotate-45'/>

        </div>

        <BookmarkIcon className='btn'/>

        </div>

        <p className='p-5 truncate '>
            {likes.length > 0 &&(
                <p className = "font-bold mb-1">{likes.length} likes</p>

            )}
            <span className='font-bold mr-1'>{username}</span>{caption}          
        </p>
        </>
        )}
       

      


        {/* Caption */}



        {/* Comments */}

        {comments.length>0 &&(

            <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                {comments.map(comment=>(
                    <div key={comment.id} className='flex items-center space-x-2 mb-3 '>
                        <img src={comment.data().userImage} alt="" className='h-7 rounded-full ' />
                        <p className='text-sm flex-1'><span className='font-bold mr-2'>{comment.data().username}</span>{comment.data().comment}</p>
                        <Moment fromNow className='p-5 text-xs'>
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                ))}
            </div>

        )}


        {/* input box */}
{session&&(
        <form className='flex items-center p-4'>
            <EmojiHappyIcon className='h-5 text-slate-400'/>
            <input type="text" placeholder='Add a comment...' onChange={e=>setComment(e.target.value)} value={comment} className='border-none flex-1 focus:ring-0 outline-none'/>
            <button  type="submit" disabled = {!comment.trim()} onClick={sendComment} className='font-semibold text-blue-400 hover:text-blue-700'>Post</button>

        </form>

)}

    </div>
  )
}

export default Post