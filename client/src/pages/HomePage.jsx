import React from 'react'
import Cards from '../components/Cards'
import AddPostButton from '../components/AddPostButton'

const HomePage = ({deletePost}) => {
  return (
    <div >
        <AddPostButton/>
        <Cards deletePost={deletePost}/>
    </div>
  )
}

export default HomePage
