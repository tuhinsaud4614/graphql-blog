import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { getAuthUser } from "utils";
import { IUser } from "utils/interfaces";

export const AuthContext = createContext<IUser | null>(null);

export function useAuth() {
  const auth = useContext(AuthContext);
  if (typeof auth === "undefined") {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return auth;
}

const AuthStateChangeContext = createContext<
  Dispatch<SetStateAction<IUser | null>> | undefined
>(undefined);

export function useAuthStateChange() {
  const setAuth = useContext(AuthStateChangeContext);
  if (typeof setAuth === "undefined") {
    throw new Error(
      "useAuthStateChange must be used within a AuthStateChangeContext"
    );
  }
  const change = useCallback((user: IUser | null) => setAuth(user), [setAuth]);
  return change;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => getAuthUser());

  return (
    <AuthContext.Provider value={user}>
      <AuthStateChangeContext.Provider value={setUser}>
        {children}
      </AuthStateChangeContext.Provider>
    </AuthContext.Provider>
  );
}
