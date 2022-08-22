import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface AuthorFollowerState {
  count: number;
}

const initialState: AuthorFollowerState = {
  count: 0,
};

export const authorFollowerCountSlice = createSlice({
  name: "authorFollowerCount",
  initialState,
  reducers: {
    setAuthorFollowerCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    authorFollowerIncrement: (state) => {
      state.count += 1;
    },
    authorFollowerDecrement: (state) => {
      state.count -= 1;
    },
  },
});

export const {
  setAuthorFollowerCount,
  authorFollowerIncrement,
  authorFollowerDecrement,
} = authorFollowerCountSlice.actions;
export const selectAuthorFollowerCount = (state: RootState) =>
  state.authorFollowerCount.count;
const authorFollowerCountReducer = authorFollowerCountSlice.reducer;
export default authorFollowerCountReducer;
