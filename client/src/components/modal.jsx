import React from 'react'
import { FaEdit,FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
const modal = ({open, onClose,postId,deletePost}) => {
    const navigate = useNavigate()
    const handleDelete = ()=>{
        const confirm = window.confirm("Delete Post!")
        if(!confirm)return
        deletePost(postId)
        window.location.reload()
    }
  return (
    <div onClick={onClose} className={
        `
        rounded
        ${open?"visible bg-gray-200":"invisible"}`
    }>
        <div className='rounded  '>
            <ul className='flex-col justify-start items-start'>
                <li className='w-[100%] p-2 hover:bg-green-200 hover:text-green-900'><Link to={`/edit-post/${postId}`} ><FaEdit className='inline mr-2 text-center'/>Edit</Link></li>
                <li className='w-[100%] p-2 hover:bg-red-100 hover:text-red-500'><Link onClick={()=>handleDelete()} ><FaTrash className='inline mr-2 text-center items-center'/>Delete</Link></li>
            </ul>
            
           
        </div>
    </div>
  )
}

export default modal
