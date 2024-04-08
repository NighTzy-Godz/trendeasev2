import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/userInterfaces";

interface UserState {
  currUser: IUser | null;
}

const initialState: UserState = {
  currUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrUser: (user, action) => {
      user.currUser = action.payload;
    },
  },
});

export const { setCurrUser } = userSlice.actions;

export default userSlice.reducer;
