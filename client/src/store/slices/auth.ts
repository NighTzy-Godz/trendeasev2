import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  authToken: string;
}

const initialState: AuthState = {
  authToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (auth, action) => {
      auth.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = authSlice.actions;
export default authSlice.reducer;
