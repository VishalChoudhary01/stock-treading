"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeTheme } from './themeSlice';

const ThemeInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedMode !== null 
      ? JSON.parse(savedMode) 
      : prefersDark;
    
    dispatch(initializeTheme(initialMode));
  }, [dispatch]);

  return null;
};

export default ThemeInitializer;