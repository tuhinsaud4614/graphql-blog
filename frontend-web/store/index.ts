import { authReducer } from "@features";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "features/notificationSlice/notificationSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ssr store configuration
// const combinedReducer = combineReducers({
//   [authSlice.name]: authReducer,
// });

// const reducer = (
//   state: ReturnType<typeof combinedReducer>,
//   action: AnyAction
// ) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     // @ts-ignore
//     reducer,
//     devTools: isDev(),
//   });

// type Store = ReturnType<typeof makeStore>;
// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = Store["dispatch"];
// export type RootState = ReturnType<Store["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const nextReduxWrapper = createWrapper(makeStore, { debug: isDev() });
