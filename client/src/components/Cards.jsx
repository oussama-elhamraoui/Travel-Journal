import React from 'react'
import { useState,useEffect } from 'react'
import api from '../api/posts'
import Card from './card'

const Cards = ({deletePost,updatePost}) => {
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchPosts = async()=>{
          try{
            const res = await api.get('/api/posts')
            if(res && res.data)
                setPosts(res.data)
          }catch(err){
          if(err.res){
              // Not in the 200 res range
              console.log(err.res.data)
            }else{
              console.log(`Error:${err.message}`)
            }
          }finally{
            setLoading(false)
          }
        }
        fetchPosts()
      },[])
      if (loading) {
        return <div>Loading...</div>; // Show a loading message while the data is being fetched
      }
    
      if (posts.length === 0) {
        return <div>No posts available</div>; // Handle case when there are no posts
      }

    return (
        <div className='container'>
            <div className='grid grid-cols-1 gap-6'>
               {posts.map(post =><Card key={post.id} post={post} deletePost={deletePost} updatePost={updatePost}/>)}
               {console.log(posts.map(post =><Card key={post.id} post={post}/>))}
               
            </div>
        </div>
    )
}


export default Cards
