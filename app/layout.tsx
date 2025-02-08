import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Blog",
  description: "A modern blog with dark/light theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} transition-colors duration-200
        bg-background-light dark:bg-background-dark
        text-text-light dark:text-text-dark`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
