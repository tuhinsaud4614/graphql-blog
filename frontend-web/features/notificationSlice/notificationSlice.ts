import { NOTIFICATIONS_KEY } from "@constants";
import { IFollowingNotification } from "@interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { readLocalStorageValue, setLocalStorageValue } from "utils";

export const isFollowingNotification = (
  notification: IFollowingNotification
): notification is IFollowingNotification => notification.type === "FOLLOWING";

export type NotificationState = {
  items: IFollowingNotification[];
  unseen: number;
};

const initialState: NotificationState =
  readLocalStorageValue<NotificationState>(NOTIFICATIONS_KEY) || {
    items: [],
    unseen: 0,
  };

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<IFollowingNotification>) => {
      state.items = [...state.items, action.payload];
      state.unseen += 1;
      setLocalStorageValue(NOTIFICATIONS_KEY, state);
    },
    seenAll: (state) => {
      state.unseen = 0;
      setLocalStorageValue(NOTIFICATIONS_KEY, {
        items: state.items,
        unseen: 0,
      });
    },
  },
});

export const { notify, seenAll } = notificationSlice.actions;
export const selectNotificationFollowing = (state: RootState) =>
  state.notification.items.filter((notification) =>
    isFollowingNotification(notification)
  );
export const selectNotificationUnSeenCount = (state: RootState) =>
  state.notification.unseen;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
