import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
    if (typeof window !== "undefined") {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
};

const initialState = {
    DarkMode:getInitialDarkMode(),
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleDarkMode:(state)=>{
            state.DarkMode = !state.DarkMode;
        }
    } 
 })

 export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;