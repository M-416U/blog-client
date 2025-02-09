"use client";

import { useRouter } from "next/navigation";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useTranslation } from "@/i18n/client";
import { langType } from "@/@types";

interface LanguageToggleProps {
  currentLang: langType;
}

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const router = useRouter();
  const { t } = useTranslation(currentLang);
  const { savePreferences } = useUserPreferences();

  const handleLanguageChange = async (newLang: langType) => {
    if (newLang === currentLang) return;

    try {
      await savePreferences({ lang: newLang });
      // Get the current path and replace the language segment
      const path = window.location.pathname;
      const newPath = path.replace(`/${currentLang}`, `/${newLang}`);
      router.push(newPath);
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-2 py-1 rounded ${
          currentLang === "en"
            ? "bg-primary-light dark:bg-primary-dark text-white"
            : "text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        disabled={currentLang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange("ar")}
        className={`px-2 py-1 rounded ${
          currentLang === "ar"
            ? "bg-primary-light dark:bg-primary-dark text-white"
            : "text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        disabled={currentLang === "ar"}
      >
        عربي
      </button>
    </div>
  );
}
