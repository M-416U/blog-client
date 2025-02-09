interface ValidationErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

interface ValidationData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const validateRegistrationForm = (
  data: ValidationData
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
    isValid = false;
  }

  // Username validation
  if (!data.username) {
    errors.username = "Username is required";
    isValid = false;
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
    isValid = false;
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  // Confirm password validation
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return { isValid, errors };
};

interface LoginValidationData {
  email: string;
  password: string;
}

interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export const validateLoginForm = (
  data: LoginValidationData
): { isValid: boolean; errors: LoginValidationErrors } => {
  const errors: LoginValidationErrors = {};
  let isValid = true;

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
    isValid = false;
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  return { isValid, errors };
};
