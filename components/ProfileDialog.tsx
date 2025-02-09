"use client";

import { useEffect, useState } from "react";
import { FiLock, FiUpload } from "react-icons/fi";
import { Dialog } from "./ui/Dialog";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axios";
import { useTranslation } from "@/i18n/client";
import { langType } from "@/@types";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lang: langType;
}

export function ProfileDialog({ isOpen, onClose, lang }: ProfileDialogProps) {
  const { t } = useTranslation(lang);
  const { token, user, setUserProfile } = useAuthStore();
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  useEffect(()=>{},[user])
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t("auth.profile.password.error.mismatch"));
      return;
    }

    try {
      await api.put(
        "/users/me/password",
        {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message || t("auth.profile.password.error.failed")
      );
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setError("");

    try {
      const { data } = await api.post("/users/me/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUserProfile(data);
    } catch (error: any) {
      setError(error.response?.data?.message || t("auth.profile.avatar.error"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={t("auth.profile.title")}>
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-primary-light dark:ring-primary-dark"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center ring-2 ring-primary-light dark:ring-primary-dark">
                <span className="text-text-light dark:text-text-dark text-3xl font-semibold">
                  {user?.username?.charAt(0).toUpperCase() ||
                    user?.email.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 p-2 rounded-full bg-primary-light dark:bg-primary-dark text-white cursor-pointer hover:opacity-90 transition-opacity ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={isUploading ? t("auth.profile.avatar.uploading") : t("auth.profile.avatar.upload")}
            >
              <FiUpload className="w-4 h-4" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isUploading}
                className="hidden"
                aria-label={t("auth.profile.avatar.upload")}
              />
            </label>
          </div>
          {isUploading && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("auth.profile.avatar.uploading")}
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-text-light dark:text-text-dark">
              {t("auth.profile.theme")}
            </span>
            <ThemeToggle />
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-text-light dark:text-text-dark">
              {t("auth.profile.language")}
            </span>
            <LanguageToggle currentLang={lang} />
          </div>
        </div>

        {/* Password Change Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-medium mb-4 text-text-light dark:text-text-dark flex items-center gap-2">
            <FiLock className="text-lg" />
            {t("auth.profile.password.title")}
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder={t("auth.profile.password.current")}
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder={t("auth.profile.password.new")}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder={t("auth.profile.password.confirm")}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-md hover:opacity-90 transition-opacity"
            >
              {t("auth.profile.password.update")}
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
