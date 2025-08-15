import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DarkMode: false,
  isInitialized: false, 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.DarkMode = !state.DarkMode;
    },
    setDarkMode: (state, action) => {
      state.DarkMode = action.payload;
    },
    initializeTheme: (state, action) => {
      state.DarkMode = action.payload;
      state.isInitialized = true;
    }
  }
});

export const { toggleDarkMode, setDarkMode, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;