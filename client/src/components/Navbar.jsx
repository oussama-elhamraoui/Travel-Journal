import React, { useEffect, useState } from 'react'
import {FaGlobeEurope} from'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/posts'

const Navbar = () => {
  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    async function getCurrentUser(){
      try{
        const response = await api.get('http://localhost:5000/api/current-user',
          {withCredentials: true});
          setUser(response.data.user);
          console.log(response.data.user);
      }catch(error){
        console.error('Error while getting the user info:', error.response ? error.response.data : error.message);
      }
    }
    getCurrentUser();

  },[]);
  async function logout(){
    try{
      const response=await api.get('http://localhost:5000/api/logout',
        {withCredentials:true}
      );
      setUser(response.data.user);
      return navigate('/');
    }catch(error){
      console.error('Error while getting the user info:', error.response ? error.response.data : error.message);
    }
  }
  async function handleLogout(event){
    event.preventDefault();
        try {
          await logout();
          console.log('logged out');
        } catch (error) {
          console.error('Error while loggin out user:', error);
        }
  }
  return (
    <div>
      <nav className='bg-[#F55A5A]'>
        <div className='text-white flex justify-between items-center p-4 pl-20 pr-20'>
          <div>
            <Link to='/' className='flex'>
              <FaGlobeEurope className='mr-2 text-large text-xl'/>
              <h1>My Travel Journal</h1>
            </Link>
          </div>
          {/* <p>{user.username}</p> */}
          {user&&console.log(user)}
          <div>
            {user ? ( // If user is available, display the username
              <div className='flex gap-6  items-center'>
                <p>Welcome, {user.username}</p>
                <button onClick={handleLogout}  className='text-[#F55A5A] bg-white p-2 rounded-lg hover:bg-gray-100'>Logout</button>
              </div>
            ) : (
              <ul className='flex justify-between'>
                <li><Link to="/login" className='hover:text-gray-100'>Login</Link></li>
                <li><Link to="/signup" className='text-[#F55A5A] bg-white p-2 m-2 rounded-lg hover:bg-gray-100'>Sign up</Link></li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
