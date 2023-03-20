import { AppState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      // console.log(action.payload);
      //   console.log(action.payload);
      return action.payload;
    },
    updateUserPoints: (state, { payload }) => {
      state.point -= payload;
    },
  },
});

export const { setUser, updateUserPoints } = userSlice.actions;
export default userSlice.reducer;
