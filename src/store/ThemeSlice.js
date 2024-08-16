import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "white",
  textColor: "black",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, data) => {
      // state.color = data.payload.color;
      // state.textColor = data.payload.textColor;
      state.theme = data.payload;
      // state.theme.color = data.payload.color;
      // state.theme.textColor = data.payload.textColor;
      // console.log("theme color", state.color);
      // console.log("textcolor color", state.textColor);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
