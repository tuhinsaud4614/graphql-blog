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
  const user1 = getAuthUser(undefined, "refresh");
  if (!user1) {
    removeLocalStorageValue(USER_KEY);
    return null;
  }
  return user || user1;
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
    updateUserName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        setLocalStorageValue(USER_KEY, {
          ...state.user,
          name: action.payload,
        });
        state.user.name = action.payload;
      }
    },
    updateUserAbout: (state, action: PayloadAction<string>) => {
      if (state.user) {
        setLocalStorageValue(USER_KEY, {
          ...state.user,
          about: action.payload,
        });
        state.user.about = action.payload;
      }
    },
  },
});

export const {
  setAuthUser,
  updateUserAvatar,
  updateUserName,
  updateUserAbout,
} = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
const authReducer = authSlice.reducer;
export default authReducer;
