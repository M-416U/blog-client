"use client";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { AuthInput } from "./ui/AuthInput";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import { useAlert } from "../context/AlertContext";
import Link from "next/link";
import { validateRegistrationForm } from "../utils/validators";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const register = useAuthStore((state) => state.register);
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

    const { isValid, errors: validationErrors } =
      validateRegistrationForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      showAlert("Registration successful!", "success");
    } catch (err) {
      console.log(err);
      showAlert("Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-text-light dark:text-text-dark">
          Register
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-light dark:bg-surface-dark py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AuthInput
              label="Email"
              type="email"
              icon={BiEnvelope}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <AuthInput
              label="Username"
              type="text"
              icon={BiUser}
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />

            <AuthInput
              label="Password"
              type="password"
              icon={BiLock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <AuthInput
              label="Confirm Password"
              type="password"
              icon={BiLock}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-light dark:text-primary-dark hover:opacity-90"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
