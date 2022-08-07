import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import {
  getAuthUser,
  readLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from "utils";
import { USER_KEY } from "utils/constants";
import { IPicture, IUser } from "utils/interfaces";

export interface AuthState {
  user: IUser | null;
}

const getUser = () => {
  const user = readLocalStorageValue<IUser>(USER_KEY);
  return user || getAuthUser(undefined, "refresh");
};

const initialState: AuthState = {
  user: getUser(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<IUser | null>) => {
      if (action.payload) {
        setLocalStorageValue("user", action.payload);
      } else {
        removeLocalStorageValue(USER_KEY);
      }
      state.user = action.payload;
    },
    updateUserAvatar: (state, action: PayloadAction<IPicture>) => {
      if (state.user) {
        setLocalStorageValue(USER_KEY, {
          ...state.user,
          avatar: action.payload,
        });
        state.user.avatar = action.payload;
      }
    },
  },
});

export const { setAuthUser, updateUserAvatar } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
const authReducer = authSlice.reducer;
export default authReducer;