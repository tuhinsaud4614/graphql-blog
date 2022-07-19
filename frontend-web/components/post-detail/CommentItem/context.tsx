import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";

export const EditStateContext = createContext<boolean>(false);

export function useEditState() {
  const editor = useContext(EditStateContext);
  if (typeof editor === "undefined") {
    throw new Error("useEditState must be used within a EditStateContext");
  }
  return editor;
}

const EditOpenerContext = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined);

export function useEditorOpener() {
  const setEditor = useContext(EditOpenerContext);
  if (typeof setEditor === "undefined") {
    throw new Error("useEditorOpener must be used within a EditOpenerContext");
  }
  const opener = useCallback(() => setEditor(true), [setEditor]);
  return opener;
}

export function useEditorCloser() {
  const setEditor = useContext(EditOpenerContext);
  if (typeof setEditor === "undefined") {
    throw new Error("useEditorOpener must be used within a EditOpenerContext");
  }
  const closer = useCallback(() => setEditor(false), [setEditor]);
  return closer;
}

export function EditProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <EditStateContext.Provider value={open}>
      <EditOpenerContext.Provider value={setOpen}>
        {children}
      </EditOpenerContext.Provider>
    </EditStateContext.Provider>
  );
}

// This will help to show or hide replies
export const RepliesStateContext = createContext<boolean>(false);

export function useRepliesState() {
  const replies = useContext(RepliesStateContext);
  if (typeof replies === "undefined") {
    throw new Error(
      "useRepliesState must be used within a RepliesStateContext"
    );
  }
  return replies;
}

const RepliesOpenerContext = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined);

export function useRepliesToggle() {
  const setReplies = useContext(RepliesOpenerContext);
  if (typeof setReplies === "undefined") {
    throw new Error(
      "useRepliesToggle must be used within a RepliesOpenerContext"
    );
  }
  const toggle = useCallback(() => setReplies((prev) => !prev), [setReplies]);
  return toggle;
}

export function useRepliesHide() {
  const setReplies = useContext(RepliesOpenerContext);
  if (typeof setReplies === "undefined") {
    throw new Error(
      "useRepliesHide must be used within a RepliesOpenerContext"
    );
  }
  const hide = useCallback(() => setReplies(false), [setReplies]);
  return hide;
}

// This will help to show or hide replies
