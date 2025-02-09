"use client";

import { useState, useEffect } from "react";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";
import { langType } from "@/@types";

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang }: { lang: langType } = useParams();
  const [language, setLanguage] = useState<langType>(lang);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLang: langType) => {
    setLanguage(newLang);
    router.push(
      `${pathName.replace(lang, newLang)}?${searchParams.toString()}`
    );
  };

  return (
    <div className={`flex items-center gap-2 p-2 ${className}`}>
      <select
        defaultValue={language}
        onChange={(e) => changeLanguage(e.target.value as langType)}
        className="h-8 w-24 px-2 text-sm font-medium bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
      >
        <option value="ar">العربية</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
