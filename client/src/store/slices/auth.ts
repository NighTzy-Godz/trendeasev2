import { createSlice } from "@reduxjs/toolkit";
import { DecodedUser } from "../../interfaces/userInterfaces";

interface AuthState {
  authToken: string;
  decodedUser: null | DecodedUser;
}

const initialState: AuthState = {
  authToken: "",
  decodedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (auth, action) => {
      auth.authToken = action.payload;
    },
    setDecodedUser: (auth, action) => {
      auth.decodedUser = action.payload;
    },
  },
});

export const { setAuthToken, setDecodedUser } = authSlice.actions;
export default authSlice.reducer;
