import { useDarkMode } from "@hooks";
import { forwardRef, RefAttributes } from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";

const ToastContainerWithTheme = forwardRef<
  HTMLDivElement,
  Omit<ToastContainerProps & RefAttributes<HTMLDivElement>, "theme" | "ref">
>((props, ref) => {
  const { isDarkMode, ternaryDarkMode } = useDarkMode();

  const theme =
    ternaryDarkMode === "system"
      ? isDarkMode
        ? "dark"
        : "light"
      : ternaryDarkMode;

  return <ToastContainer {...props} theme={theme} ref={ref} />;
});
ToastContainerWithTheme.displayName = "ToastContainerWithTheme";
export default ToastContainerWithTheme;
