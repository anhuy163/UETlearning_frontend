import { AppState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<any>) => {
      // console.log(action.payload);
      return [...action.payload];
    },
    updateContactsByMsg: (state, { payload }) => {
      const updatedContactIndex = state.findIndex(
        (item: any) => item.student.id === payload.studentId
      );
      // console.log(updatedContactIndex);
      if (updatedContactIndex !== -1) {
        if (updatedContactIndex === 0) {
          state[updatedContactIndex] = {
            ...state[updatedContactIndex],
            lastMessage: payload.msg,
          };
        } else {
          let updatedElement = state[updatedContactIndex];
          updatedElement = { ...updatedElement, lastMessage: payload.msg };
          state.splice(updatedContactIndex, 1);
          state.unshift(updatedElement);
        }
      } else {
        return [
          {
            student: {
              id: payload.studentId,
              realName: payload.senderName,
              avaPath: payload.senderAvatar,
            },
          },
          ...state,
        ];
      }
    },
  },
});

export const { setContacts, updateContactsByMsg } = contactsSlice.actions;
// export const contacts = (state: AppState) => state.contacts;
export default contactsSlice.reducer;
