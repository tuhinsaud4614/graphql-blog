"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="fixed top-0 right-0 z-10">
      <select
        value={theme}
        onChange={(e) => {
          console.log(e.target.value);

          setTheme(e.target.value);
        }}
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
