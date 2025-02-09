"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { savePreferences } = useUserPreferences();

  const handleToggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme();
    try {
      await savePreferences({ theme: newTheme });
    } catch (error) {
      // If saving fails, we keep the UI change but log the error
      console.error("Failed to save theme preference:", error);
    }
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 mx-3 rounded-lg bg-surface-light dark:bg-surface-dark
        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
}
