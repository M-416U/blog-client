import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";
import { RegisterData, UserProfile } from "@/@types";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUserProfile: (profile: UserProfile) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password) => {
        try {
          const { data } = await api.post("/auth/login", {
            email,
            password,
          });
          set({ token: data.token, user: data.user });
        } catch (error) {
          console.log(error);
          throw new Error("Invalid credentials");
        }
      },
      register: async (data) => {
        try {
          const response = await api.post("/auth/register", data);
          if (response.data.token) {
            set({ token: response.data.token });
          }
        } catch (error) {
          console.log(error);
          throw new Error("Registration failed");
        }
      },
      logout: () => set({ token: null, user: null }),
      setUserProfile: (profile: UserProfile) => set({ user: profile }),
    }),
    {
      name: "auth-storage",
    }
  )
);
