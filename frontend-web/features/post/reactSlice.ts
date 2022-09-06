import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface ReactState {
  isReacted: boolean;
  count: number;
}

const initialState: ReactState = {
  count: 0,
  isReacted: false,
};

export const reactSlice = createSlice({
  name: "reactCount",
  initialState,
  reducers: {
    setReactCount: (state, action: PayloadAction<ReactState>) => {
      const { count, isReacted } = action.payload;
      state.count = count;
      state.isReacted = isReacted;
    },
    setToggleReact: (state) => {
      state.count = state.isReacted ? --state.count : ++state.count;
      state.isReacted = !state.isReacted;
    },
  },
});

export const { setReactCount, setToggleReact } = reactSlice.actions;
export const selectReact = (state: RootState) => state.react;
const reactSliceReducer = reactSlice.reducer;
export default reactSliceReducer;
