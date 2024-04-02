import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  colorTheme: string;
  showLoginModal: boolean;
}

const initialState: UIState = {
  colorTheme: "dark",
  showLoginModal: false,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setColorTheme: (ui, action) => {
      ui.colorTheme = action.payload;
    },
    setShowLoginModal: (ui, action) => {
      ui.showLoginModal = action.payload;
    },
  },
});

export const { setColorTheme, setShowLoginModal } = ui.actions;

export default ui.reducer;
