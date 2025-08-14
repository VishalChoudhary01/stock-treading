"use client"
import { useSelector,useDispatch} from 'react-redux';
import { toggleDarkMode } from '../features/themeSlice';
import { useEffect } from 'react';

const useDarkMode = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.DarkMode);

    useEffect(()=>{
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem("darkMode",isDarkMode);
    },[isDarkMode])

    const toggleMode = () => {
        dispatch(toggleDarkMode());
    };

    return {
        isDarkMode,
        toggleMode
    };

}

export default useDarkMode;