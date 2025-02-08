import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface AuthInputProps {
  label: string;
  type: string;
  icon: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function AuthInput({
  label,
  type,
  icon: Icon,
  value,
  onChange,
  error,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-light dark:text-text-dark">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-10 py-2 border dark:border-gray-700 rounded-lg 
                   bg-surface-light dark:bg-surface-dark
                   text-text-light dark:text-text-dark
                   focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark 
                   focus:border-primary-light dark:focus:border-primary-dark
                   placeholder-gray-400 dark:placeholder-gray-500
                   transition-colors"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <BsEyeSlash className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
            ) : (
              <BsEye className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
