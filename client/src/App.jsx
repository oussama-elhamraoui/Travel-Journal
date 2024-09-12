import React, { useEffect } from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import api from './api/posts'
import AddPostPage from './pages/AddPostPage'
import EditPostPage, { postLoader } from './pages/EditPostPage'

const App = () => {
  const addPost= async(formData)=>{
    // try{
    //   console.log('new Post ',newPost)
    //   const res = await api.post('/api/posts',newPost)
    // }catch(err){
    // if(err.res){
    //     // Not in the 200 res range
    //     console.log(err.res.data)
    //   }else{
    //     console.log(`Error:${err.message}`)
    //   }
    // }
    try {
      const response = await api.post('http://localhost:5000/api/posts', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      console.log('Post created:', response.data);
  } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
  }
  }
  const deletePost = async(postId) =>{
    try{
      const response = await api.delete(`http://localhost:5000/api/posts/${postId}`)
      console.log('Post deleted:', response.data);
    }catch (error) {
      console.error('Error deleting post:', error.response ? error.response.data : error.message);
  }
  }
  const updatePost = async (post, postId) => {
    try {
      console.log('form Data before sending:', post);
      console.log(postId)
      console.log(post)
      
      const response = await api.put(`http://localhost:5000/api/posts/${postId}`, post, {
      });
  
      console.log('Post updated:', response.data);
    } catch (error) {
      console.error('Error updating post:', error.response ? error.response.data : error.message);
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage deletePost={deletePost}/>}/>
        <Route path='/add-post' element={<AddPostPage addPostSubmit={addPost}/>}/>
        <Route path='/edit-post/:id' element={<EditPostPage updatePost={updatePost} />} loader={postLoader}/>
      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
