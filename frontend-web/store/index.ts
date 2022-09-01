import { authorFollowerCountReducer, authReducer } from "@features";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import notificationReducer from "features/notificationSlice/notificationSlice";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { isDev } from "utils";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     notification: notificationReducer,
//     authorFollowerCount: authorFollowerCountReducer,
//   },
//   devTools: process.env.NODE_ENV === "development",
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ssr store configuration
const combinedReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  authorFollowerCount: authorFollowerCountReducer,
});

// const reducer = (
//   state: ReturnType<typeof combinedReducer>,
//   action: AnyAction
// ) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload,
//       // apply delta from hydration
//     };
//     setLocalStorageValue(USER_KEY, action.payload.auth.user);
//     return nextState;
//   }

//   return combinedReducer(state, action);
// };

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    // @ts-ignore
    // reducer,
    devTools: isDev(),
  });

export type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const nextReduxWrapper = createWrapper(
  makeStore /*,{ debug: isDev() }*/
);
