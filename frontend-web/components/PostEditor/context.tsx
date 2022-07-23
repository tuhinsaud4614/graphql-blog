import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";

type LanguageType =
  | "js"
  | "typescript"
  | "python"
  | "html"
  | "php"
  | "sql"
  | "css"
  | "java"
  | "bash"
  | null;

export const CodeLanguageContext = createContext<LanguageType>(null);

export function useCodeLanguage() {
  const language = useContext(CodeLanguageContext);
  if (typeof language === "undefined") {
    throw new Error(
      "useCodeLanguage must be used within a CodeLanguageContext"
    );
  }
  return language;
}

export const CodeLanguageChangerContext = createContext<
  Dispatch<SetStateAction<LanguageType>> | undefined
>(undefined);

export function useCodeLanguageChanger() {
  const setCodeLanguage = useContext(CodeLanguageChangerContext);
  if (typeof setCodeLanguage === "undefined") {
    throw new Error(
      "useCodeLanguageChanger must be used within a CodeLanguageChangerContext"
    );
  }
  const changer = useCallback(
    (value: LanguageType) => setCodeLanguage(value),
    [setCodeLanguage]
  );
  return changer;
}

export function CodeLanguageProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<LanguageType>(null);

  return (
    <CodeLanguageContext.Provider value={open}>
      <CodeLanguageChangerContext.Provider value={setOpen}>
        {children}
      </CodeLanguageChangerContext.Provider>
    </CodeLanguageContext.Provider>
  );
}
