import React from 'react'
import Cards from '../components/Cards'
import AddPostButton from '../components/AddPostButton'

const HomePage = ({deletePost,updatePost}) => {
  return (
    <div >
        <AddPostButton/>
        <Cards deletePost={deletePost} updatePost={updatePost}/>
    </div>
  )
}

export default HomePage
