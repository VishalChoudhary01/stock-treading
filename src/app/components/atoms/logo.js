import React from 'react'
import { FaUserTie } from "react-icons/fa6";
const Logo = () => {
  return (
    <div className='flex items-center lg:gap-x-1.5 gap-x-1 text-nowrap xl:text-2xl lg:text-2xl md:text-xl md:p-2'><FaUserTie className='xl:text-3xl lg:text-3xl md:text-2xl text-logoIcon  '/> <span className='text-nowrap bg-linear-60  to-logoGradientTo from-logoGradientFrom  bg-clip-text text-transparent font-kanit font-bold tracking-wide '>Trad Brains</span></div>
  ) 
}

export default Logo