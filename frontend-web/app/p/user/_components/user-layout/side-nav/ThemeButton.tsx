import ThemeSwitch from "@/components/theme-switch";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function ThemeButton() {
  const matches = useMediaQuery("(min-width: 1024px)");

  if (!matches) {
    return null;
  }
  return (
    <li>
      <ThemeSwitch
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        tooltipOrigin={{ horizontal: "right", vertical: "bottom" }}
      />
    </li>
  );
}
