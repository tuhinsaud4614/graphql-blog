"use client";

import * as React from "react";

import { createContext, useContextSelector } from "use-context-selector";

// Types
export interface ReactState {
  isReacted: boolean;
  count: number;
}

type Action =
  | { type: "setReactCount"; payload: ReactState }
  | { type: "setToggleReact"; payload: boolean };

// Initial State
const initialState: ReactState = {
  count: 0,
  isReacted: false,
};

// Reducer
function reactReducer(state: ReactState, action: Action): ReactState {
  switch (action.type) {
    case "setReactCount":
      return {
        count: action.payload.count,
        isReacted: action.payload.isReacted,
      };
    case "setToggleReact":
      return {
        count: action.payload ? state.count + 1 : state.count - 1,
        isReacted: action.payload,
      };
    default:
      return state;
  }
}

// Context
const ReactContext = createContext<{
  state: ReactState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider
export const ReactProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reactReducer, initialState);

  return (
    <ReactContext.Provider value={{ state, dispatch }}>
      {children}
    </ReactContext.Provider>
  );
};

// Hooks using use-context-selector
export const useReactState = <T,>(selector: (state: ReactState) => T) =>
  useContextSelector(ReactContext, (ctx) => {
    if (!ctx) throw new Error("ReactContext is not available");
    return selector(ctx.state);
  });

export const useReactDispatch = () =>
  useContextSelector(ReactContext, (ctx) => {
    if (!ctx) throw new Error("ReactContext is not available");
    return ctx.dispatch;
  });
