import React, { useState } from 'react'
import api from '../api/posts'
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {

    const [user,setUser]= useState({
        username:'',
        email:'',
        password:''
    });
    const [message,setMessage]=useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevPost => ({
          ...prevPost,
          [name]: value
        }));
      };
    async function signupUser(user,navigate,setMessage){
        try{
          const response = await api.post('http://localhost:5000/api/signup',user,{ withCredentials: true });
          console.log('User created:', response.data);
          return navigate('/');
        }catch(error){
          if(error.response){
            setMessage(error.response.data.msg);
          }else{
            setMessage('An error occurred. Please try again');
          }
          console.error('Error creating post:', error.response ? error.response.data : error.message);
        }
      }
    const navigate=useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        try {
          console.log(user)
          await signupUser(user,navigate,setMessage);
        } catch (error) {
          console.error('Error while signingup user:', error);
        }
      }
  return (
    <div>
      <section className="bg-[#ffeded] h-[100vh]">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          {message?<div className='bg-[#ffeded] border-2 border-[#F55A5A] text-[#F55A5A] rounded-md p-4 text-center mb-6'>
            {message}
          </div>:''}
          
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign up</h2>

            
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Username</label
              >
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Mario"
                required
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. mario@google.com"
                required
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="bg-[#F55A5A] hover:bg-[#c92222] text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}

export default SignUpPage
