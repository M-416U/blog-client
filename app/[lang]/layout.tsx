import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AlertProvider } from "@/context/AlertContext";
import i18nConfig from "@/i18nConfig";
import { languages } from "@/i18n/settings";
import { dir } from "i18next";
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Modern Blog",
  description: "A modern blog with dark/light theme",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!i18nConfig.locales.includes(lang)) {
    notFound();
  }
  return (
    <html lang="en" suppressHydrationWarning dir={dir(lang)}>
      <body
        className={`${inter.className} transition-colors duration-200
        bg-background-light dark:bg-background-dark
        text-text-light dark:text-text-dark`}
      >
        <LanguageProvider>
          <ThemeProvider>
            <AlertProvider>{children}</AlertProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
