"use client";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";
import api from "@/lib/axios";
import { useTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";
import { langType } from "@/@types";
import { ProfileDialog } from "./ProfileDialog";

export const AuthButton = () => {
  const { lang }: { lang: langType } = useParams();
  const { t } = useTranslation(lang);
  const { token, user, logout, setUserProfile } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchuser = async () => {
      if (token) {
        try {
          const { data } = await api.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserProfile(data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchuser();
  }, [token, setUserProfile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!token || !user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center px-4 py-2 rounded-lg border text-text-light dark:text-text-dark border-primary-light dark:border-primary-dark hover:opacity-90 transition-all"
      >
        {t("auth.button.signInUp")}
      </Link>
    );
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-light dark:ring-primary-dark"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center ring-2 ring-primary-light dark:ring-primary-dark">
              <span className="text-text-light dark:text-text-dark text-lg font-semibold">
                {user?.username?.charAt(0).toUpperCase() ||
                  user.email.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg w-fit bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 animate-slide-in">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-text-light dark:text-text-dark font-xs">
                {user?.username || user.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {user.role}
              </p>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  setShowProfileDialog(true);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full p-2 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <FiUser className="text-lg" />
                <span>{t("auth.button.profile")}</span>
              </button>

              <button
                onClick={() => logout()}
                className="flex items-center gap-2 w-full p-2 text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <FiLogOut className="text-lg" />
                <span>{t("auth.button.signOut")}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ProfileDialog
        isOpen={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
        lang={lang}
      />
    </>
  );
};
