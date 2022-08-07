export {
  authSlice,
  default as authReducer,
  selectUser,
  setAuthUser,
  updateUserAvatar,
  updateUserName,
} from "./auth/authSlice";
export type { AuthState } from "./auth/authSlice";
