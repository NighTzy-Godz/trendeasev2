import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  colorTheme: string;
}

const initialState: UIState = {
  colorTheme: "dark",
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setColorTheme: (ui, action) => {
      ui.colorTheme = action.payload;
    },
  },
});

export const { setColorTheme } = ui.actions;

export default ui.reducer;
