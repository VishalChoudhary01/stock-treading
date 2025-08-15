"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full bg-footBg dark:bg-footDarkBg  text-textColor dark:text-textDarkColor py-6 px-4 md:px-10 border-t border-glassBorder dark:border-glassDarkBorder
        transition-colors duration-500
      "
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold font-kanit tracking-wide">
          Trad Brains
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-roboto text-sm">
          <Link
            href="/"
            className="hover:text-primary dark:hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/saved"
            className="hover:text-primary dark:hover:text-primary transition-colors"
          >
            Saved
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 rounded-full hover:bg-sectionBg dark:hover:bg-sectionDarkBg transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-2 rounded-full hover:bg-sectionBg dark:hover:bg-sectionDarkBg transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="p-2 rounded-full hover:bg-sectionBg dark:hover:bg-sectionDarkBg transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="p-2 rounded-full hover:bg-sectionBg dark:hover:bg-sectionDarkBg transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="border-t border-glassBorder dark:border-glassDarkBorder my-4"></div>

      <div className="text-center text-xs text-paragraph dark:text-paragraphDark font-roboto">
        © {new Date().getFullYear()} Trad Brains. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
