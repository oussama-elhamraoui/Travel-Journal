import React from 'react'
import { FaMapMarkerAlt,FaEllipsisV } from 'react-icons/fa'
import Modal from './modal'
import { useState } from 'react'

const Card = ({post,deletePost}) => {
  const [open,setOpen] = useState(false)
  return (
    <div>
      <div className='flex justify-center items-center  m-8 '>
        {console.log(post.imageurl)}
        <div className='overflow-hidden w-40 h-60 rounded-xl'>
          <img src={post.imageurl} alt={post.title} className='w-40 h-60' />

        </div>
        <div className='ml-6 flex flex-col justify-center'>
          <div className='flex items-center'>
            <FaMapMarkerAlt className='text-[#F55A5A] mr-2'/>
            <p className='uppercase mr-4 tracking-wide'>{post.location}</p>
            <a href={post.googlemapsurl} target="_blank" className='text-[#918E9B] underline decoration-solid underline-offset-2'>View on Google Maps</a>
          </div>
          <h1 className='text-3xl font-bold mt-2'>{post.title}</h1>
          {console.log("Start date",post.startdate)}
          <p className='mt-6 text-sm font-semibold'>{post.startdate.slice(0,10).replaceAll('-', '/')} - {post.enddate.slice(0,10).replaceAll('-', '/')}</p>
          <p className='w-[35vw] mt-2 text-sm'>{post.description}</p>
        </div>
        <div className='self-start'>
          <button className='self-start mt-2 hover:bg-gray-200 p-2 rounded' onClick={()=>open?setOpen(false):setOpen(true)}>
            <FaEllipsisV />

          </button>
          <Modal open={open} deletePost={deletePost} postId={post.id} />

        </div>
      </div>
    </div>
  )
}
const postLoader = async(params)=>{
  try{
    console.log(params.id)
    const response = await api.get(`http://localhost:5000/api/posts/${params.id}`)
    console.log('Post fetched:',repsonse.data)
  }catch(error){
    console.error('Error updating post:', error.response ? error.response.data : error.message);
  }
}
export {Card as default,postLoader}
