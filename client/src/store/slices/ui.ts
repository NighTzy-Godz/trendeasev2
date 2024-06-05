import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  colorTheme: string;
  showLoginModal: boolean;
  showRegisterUserModal: boolean;
  showUserCart: boolean;
}

const initialState: UIState = {
  colorTheme: "",
  showLoginModal: false,
  showRegisterUserModal: false,
  showUserCart: false,
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
    setShowUserCart: (ui, action) => {
      ui.showUserCart = action.payload;
    },
  },
});

export const {
  setColorTheme,
  setShowRegisterUserModal,
  setShowLoginModal,
  setShowUserCart,
} = ui.actions;

export default ui.reducer;
