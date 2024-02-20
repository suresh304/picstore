import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
        return null;
      },
  },
});
export const  {addUser,removeUser} = authSlice.actions
export default authSlice.reducer