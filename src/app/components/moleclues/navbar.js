"use client";
import React, { useState } from "react";
import Logo from "./../atoms/logo";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import useDarkMode from "@/app/hooks/useDarkMode";
import MobileSideMenu from "./mobileSideMenu";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const Navbar = () => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 w-full px-4 md:py-1.5 py-1.5 md:px-8  z-20 flex items-center justify-between bg-navbarBg dark:bg-navbarDarkBg  shadow-md transition-all duration-500">
        {/* Logo */}
        <Link href={"/"}>
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-8 font-medium font-roboto text-link dark:text-linkDark">
          <Link href={"/"} className="hover:text-primary transition-colors">Home</Link>
          <Link href={"/saved"} className="hover:text-primary transition-colors">Saved</Link>
          <button
            onClick={toggleMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <BsFillMoonFill size={18}/> : <BsFillSunFill size={18}/>}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleMenu}
        >
          <FaBars size={20} className="text-link dark:text-linkDark" />
        </button>
      </nav>

      {/* Mobile Side Menu */}
      <MobileSideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Navbar;
