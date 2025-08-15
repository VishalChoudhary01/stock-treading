"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Logo from "../atoms/logo";
import Link from "next/link";
import useDarkMode from "@/app/hooks/useDarkMode";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const MobileSideMenu = ({ toggleMenu, isMenuOpen }) => {
  const { isDarkMode, toggleMode } = useDarkMode();

  return (
    <aside>
      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[58%] sm:w-80 bg-navbarBg dark:bg-navbarDarkBg shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
          <Logo />
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMenu}
          >
            <FaTimes size={20} className="text-link dark:text-linkDark" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 p-6 font-medium font-roboto text-md text-link dark:text-linkDark">
          <Link href={"/"} onClick={toggleMenu} className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href={"/saved"} onClick={toggleMenu} className="hover:text-primary transition-colors">
            Saved
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleMode();
              toggleMenu();
            }}
            className="flex items-center gap-2 px-4 py-2  absolute  right-0"
          >
            {isDarkMode ? <BsFillMoonFill /> : <BsFillSunFill />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity"
          onClick={toggleMenu}
        ></div>
      )}
    </aside>
  );
};

export default MobileSideMenu;
