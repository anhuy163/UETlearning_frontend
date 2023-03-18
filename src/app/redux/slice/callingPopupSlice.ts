import { AppState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const callingPopupSlice = createSlice({
  name: "callingPopup",
  initialState,
  reducers: {
    setTogglePopup: (state, action: PayloadAction<any>) => {
      // console.log(action.payload);
      //   console.log(action.payload);
      return !state;
    },
  },
});

export const { setTogglePopup } = callingPopupSlice.actions;
export default callingPopupSlice.reducer;
