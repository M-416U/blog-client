"use client";

import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: DialogProps) {

  const {lang} = useParams()
  const isAr = lang === "ar" ;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-surface-light dark:bg-surface-dark rounded-lg p-6 w-full ${maxWidthClasses[maxWidth]} relative animate-fade-in`}
      >
        <button
          onClick={onClose}
          className={`absolute ${isAr ? 'left-4' : 'right-4'} top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
        >
          <FiX className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
