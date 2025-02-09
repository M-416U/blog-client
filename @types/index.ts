export interface UserProfile {
  email: string;
  username: string;
  role: string;
  avatar?: string;
  preferences: {
    theme: string;
  };
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  avatar?: string;
  interests?: string[];
}

export type langType = "en" | "ar";
