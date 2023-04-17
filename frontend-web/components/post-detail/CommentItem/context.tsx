import * as React from "react";

export const EditStateContext = React.createContext<boolean>(false);

export function useEditState() {
  const editor = React.useContext(EditStateContext);
  if (typeof editor === "undefined") {
    throw new Error("useEditState must be used within a EditStateContext");
  }
  return editor;
}

const EditOpenerContext = React.createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

export function useEditorOpener() {
  const setEditor = React.useContext(EditOpenerContext);
  if (typeof setEditor === "undefined") {
    throw new Error("useEditorOpener must be used within a EditOpenerContext");
  }
  const opener = React.useCallback(() => setEditor(true), [setEditor]);
  return opener;
}

export function useEditorCloser() {
  const setEditor = React.useContext(EditOpenerContext);
  if (typeof setEditor === "undefined") {
    throw new Error("useEditorOpener must be used within a EditOpenerContext");
  }
  const closer = React.useCallback(() => setEditor(false), [setEditor]);
  return closer;
}

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <EditStateContext.Provider value={open}>
      <EditOpenerContext.Provider value={setOpen}>
        {children}
      </EditOpenerContext.Provider>
    </EditStateContext.Provider>
  );
}
