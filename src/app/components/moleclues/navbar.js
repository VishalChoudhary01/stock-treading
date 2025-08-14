"use client"
import React from 'react'
import Logo from './../atoms/logo';
import Link from 'next/link';
import useDarkMode from '@/app/hooks/useDarkMode';

const Navbar = () => {
  const { isDarkMode, toggleMode } = useDarkMode();
  return (
    <nav className='w-full flex items-center bg-navbarBg dark:bg-navbarDarkBg  transition-all duration-500  md:px-3 md:py-2'>
      <Logo/>
      <div className='grow md:flex hidden justify-end items-center gap-4 dark:text-linkDark text-link font-medium font-roboto'>
        <Link href={"/"} >Home</Link>
      <button onClick={toggleMode} className=''>Toggle</button>
      </div>
    </nav>
  )
}

export default Navbar