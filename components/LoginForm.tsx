"use client";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthInput } from "@/components/ui/AuthInput";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { useAlert } from "@/context/AlertContext";
import Link from "next/link";
import { validateLoginForm } from "@/utils/validators";
import { useTranslation } from "@/i18n/client";
import { langType } from "@/@types";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginForm = ({ lang }: { lang: langType }) => {
  const { t } = useTranslation(lang);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const { showAlert } = useAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateLoginForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      showAlert(t("auth.login.successMessage"), "success");
    } catch (err) {
      console.log(err);
      showAlert(t("auth.login.errorMessage"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-text-light dark:text-text-dark">
          {t("auth.login.title")}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-light dark:bg-surface-dark py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AuthInput
              label={t("auth.login.email")}
              type="email"
              icon={BiEnvelope}
              value={formData.email}
              onChange={handleChange}
              name="email"
              error={errors.email}
            />

            <AuthInput
              label={t("auth.login.password")}
              type="password"
              icon={BiLock}
              value={formData.password}
              onChange={handleChange}
              name="password"
              error={errors.password}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark disabled:opacity-50"
            >
              {loading
                ? t("auth.login.loadingButton")
                : t("auth.login.submitButton")}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {t("auth.login.noAccount")}{" "}
            <Link
              href="/register"
              className="font-medium text-primary-light dark:text-primary-dark hover:opacity-90"
            >
              {t("auth.login.createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
