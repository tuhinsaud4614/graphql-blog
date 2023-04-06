import * as React from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import useLocalStorage from "./useLocalStorage";
import useMediaQuery from "./useMediaQuery";
import useUpdateEffect from "./useUpdateEffect";

type TernaryDarkMode = "system" | "dark" | "light";
interface UseTernaryDarkModeOutput {
  isDarkMode: boolean;
  ternaryDarkMode: TernaryDarkMode;
  setTernaryDarkMode: React.Dispatch<React.SetStateAction<TernaryDarkMode>>;
  toggleTernaryDarkMode: () => void;
}

export default function useDarkMode(): UseTernaryDarkModeOutput {
  const isDarkOS = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setDarkMode] = React.useState<boolean>(isDarkOS);
  const [ternaryDarkMode, setTernaryDarkMode] =
    useLocalStorage<TernaryDarkMode>("theme", "system");

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    if (ternaryDarkMode === "system") {
      setDarkMode(isDarkOS);
    }
  }, [isDarkOS]);

  useIsomorphicLayoutEffect(() => {
    switch (ternaryDarkMode) {
      case "light":
        setDarkMode(false);
        break;
      case "system":
        setDarkMode(isDarkOS);
        break;
      case "dark":
        setDarkMode(true);
        break;
    }
  }, [ternaryDarkMode, isDarkOS]);

  useIsomorphicLayoutEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleTernaryDarkMode() {
    const toggleDict: Record<TernaryDarkMode, TernaryDarkMode> = {
      light: "system",
      system: "dark",
      dark: "light",
    };
    setTernaryDarkMode((prevMode) => toggleDict[prevMode]);
  }

  return {
    isDarkMode,
    ternaryDarkMode,
    setTernaryDarkMode,
    toggleTernaryDarkMode,
  };
}
