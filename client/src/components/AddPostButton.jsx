import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const AddPostButton = () => {
  return (
    <div className='flex justify-center align-center md:px-40 mt-8 px-10'>
        
      <Link to="/add-post" className='bg-[#F55A5A] text-center text-white rounded w-full py-2 hover:bg-[#c92222] flex justify-center items-center '><FaPlus className='mr-2'/>Add a post</Link>
    </div>
  )
}

export default AddPostButton
