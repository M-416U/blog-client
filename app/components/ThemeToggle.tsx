"use client";

import { useTheme } from "./providers/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-surface-light dark:bg-surface-dark
        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === "light" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
}
