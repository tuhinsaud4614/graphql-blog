import type { ReactNode } from "react";
import * as React from "react";

type UseDataReturnType<T> = {
  get(): T;
  set(value: Partial<T>): void;
  subscribe(cb: () => void): () => void;
};

/** It will create Optimize context. */
export default function createOptimizeContext<T>(
  initialState: T,
  name?: string,
) {
  function useStoreData(): UseDataReturnType<T> {
    const store = React.useRef(initialState);
    const subscribers = React.useRef(new Set<() => void>());

    const get = React.useCallback(() => store.current, []);

    const set = React.useCallback((value: Partial<T>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((cb) => cb());
    }, []);

    const subscribe = React.useCallback((cb: () => void) => {
      subscribers.current.add(cb);
      return () => subscribers.current.delete(cb);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const StoreContext = React.createContext<ReturnType<
    typeof useStoreData
  > | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  function userStore<U>(
    selector: (store: T) => U,
  ): [U, (value: Partial<T>) => void] {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = React.useContext(StoreContext);

    if (!store) {
      throw new Error(`${name || "Optimize"} context store not found!`);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = React.useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState),
    );
    return [state, store.set];
  }

  return { Provider, userStore };
}
