import { AppState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = <any>[];

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, { payload }) => {
      console.log(payload);

      return [...state, payload];
    },
  },
});

export const { setContacts } = contactsSlice.actions;
export const contacts = (state: AppState) => state.contacts;
export default contactsSlice.reducer;
