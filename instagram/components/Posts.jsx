import React, { useState, useEffect } from 'react'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

 
 


function Posts(){
    const [posts, setPosts] = useState([])

    // const [comments, setComments] = useState([]);


    useEffect(()=>
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot=>{
            setPosts(snapshot.docs)
      })

      , [db]
      );


  return (
    <div>
        {/* Post */}
{posts.map((post)=>(
    <Post id={post.id} key ={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption ={post.data().caption}/>
))}
        {/* Post */}

    </div>
  )
}

export default Posts