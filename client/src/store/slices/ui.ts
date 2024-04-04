import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  colorTheme: string;
  showLoginModal: boolean;
  showRegisterUserModal: boolean;
}

const initialState: UIState = {
  colorTheme: "dark",
  showLoginModal: false,
  showRegisterUserModal: false,
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
    setShowRegisterUserModal: (ui, action) => {
      ui.showRegisterUserModal = action.payload;
    },
  },
});

export const { setColorTheme, setShowRegisterUserModal, setShowLoginModal } =
  ui.actions;

export default ui.reducer;
