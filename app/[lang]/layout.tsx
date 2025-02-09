import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AlertProvider } from "@/context/AlertContext";
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  return (
    <html lang="en" suppressHydrationWarning dir={dir(lang)}>
      <body
        className={`${inter.className} transition-colors duration-200
        bg-background-light dark:bg-background-dark
        text-text-light dark:text-text-dark`}
      >
        <ThemeProvider>
          <AlertProvider>{children}</AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
