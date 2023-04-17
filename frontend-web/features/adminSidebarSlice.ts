import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";

export interface SidebarState {
  value: boolean;
}

const initialState: SidebarState = {
  value: false,
};

export const sidebarSlice = createSlice({
  name: "adminSidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export const selectAdminSidebar = (state: RootState) =>
  state.adminSidebar.value;
export default sidebarSlice.reducer;
