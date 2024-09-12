import React from 'react'
import {FaGlobeEurope} from'react-icons/fa'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-[#F55A5A]'>
        <div className='text-white flex justify-center items-center p-4'>
            <FaGlobeEurope className='mr-2 text-large text-xl'/>
            <h1>My Travel Journal</h1>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
