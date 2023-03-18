import contactsSlice from "./slice/contactsSlice";
import userSlice from "./slice/userSlice";
import callingPopupSlice from "./slice/callingPopupSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    user: userSlice,
    callingPopup: callingPopupSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
