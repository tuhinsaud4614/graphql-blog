import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "@/store";
import {
  readLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from "@/utils";
import { USER_KEY } from "@/utils/constants";
import { IPicture, IUser } from "@/utils/interfaces";

export interface AuthState {
  user: IUser | null;
  token: string | null;
}

const getUser = () => {
  const user = readLocalStorageValue<IUser>(USER_KEY);

  return user;
};

const initialState: AuthState = {
  user: getUser(),
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthState>) => {
      const { user } = action.payload;
      if (user) {
        setLocalStorageValue(USER_KEY, action.payload.user);
      } else {
        removeLocalStorageValue(USER_KEY);
      }
      state.user = action.payload.user;
      state.token = action.payload.token;
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
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<any>) => {
      if (!action.payload.auth.user || !action.payload.auth.token) {
        return state;
      }
      const nextState = {
        ...state, // use previous state
        // @ts-ignore
        user: action.payload.auth.user,
        // @ts-ignore
        token: action.payload.auth.token,
      };
      setLocalStorageValue(USER_KEY, action.payload.auth.user);
      return nextState;
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
export const selectAccessToken = (state: RootState) => state.auth.token;
const authReducer = authSlice.reducer;
export default authReducer;
