export {
  authSlice,
  default as authReducer,
  selectUser,
  setAuthUser,
  updateUserAvatar,
} from "./auth/authSlice";
export type { AuthState } from "./auth/authSlice";
