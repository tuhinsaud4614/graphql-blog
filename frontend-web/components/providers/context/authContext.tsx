"use client";

import React from "react";

import { produce } from "immer";
import { createContext } from "use-context-selector";

import { USER_KEY } from "@/lib/constants";
import { userSchema } from "@/lib/schema";
import { IPicture, IUser } from "@/lib/types";
import {
  readLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from "@/lib/utils";

export interface AuthState {
  user: IUser | null;
  token: string | null;
}

export const AuthActionTypes = {
  setUser: "SET_AUTH_USER",
  updateAvatar: "UPDATE_USER_AVATAR",
  updateUsername: "UPDATE_USERNAME",
  updateAbout: "UPDATE_USER_ABOUT",
} as const;

export type AuthAction =
  | { type: typeof AuthActionTypes.setUser; payload: AuthState }
  | { type: typeof AuthActionTypes.updateAvatar; payload: IPicture }
  | { type: typeof AuthActionTypes.updateUsername; payload: string }
  | { type: typeof AuthActionTypes.updateAbout; payload: string };

const getUser = () => readLocalStorageValue(userSchema, USER_KEY);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === AuthActionTypes.setUser) {
    const { user } = action.payload;
    if (user) {
      setLocalStorageValue(USER_KEY, user);
    } else {
      removeLocalStorageValue(USER_KEY);
    }
    return {
      ...action.payload,
    };
  }

  if (action.type === AuthActionTypes.updateAvatar) {
    const updated = produce(state, (draft) => {
      if (draft.user) {
        draft.user.avatar = action.payload;
        setLocalStorageValue(USER_KEY, draft.user);
      }
    });
    return updated;
  }

  if (action.type === AuthActionTypes.updateUsername) {
    const updated = produce(state, (draft) => {
      if (draft.user) {
        draft.user.name = action.payload;
        setLocalStorageValue(USER_KEY, draft.user);
      }
    });
    return updated;
  }

  if (action.type === AuthActionTypes.updateAbout) {
    const updated = produce(state, (draft) => {
      if (draft.user) {
        draft.user.about = action.payload;
        setLocalStorageValue(USER_KEY, draft.user);
      }
    });
    return updated;
  }

  throw new Error("Provide valid action for Auth");
};

const initialState = { token: null, user: getUser() };

export const AuthStateContext = createContext<AuthState>(initialState);
export const AuthDispatchContext =
  createContext<React.Dispatch<AuthAction> | null>(null);

export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
