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
