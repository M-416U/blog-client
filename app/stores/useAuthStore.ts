import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
      register: async (email, password) => {
        try {
          await api.post("/auth/register", {
            email,
            password,
          });
        } catch (error) {
          console.log(error);
          throw new Error("Registration failed");
        }
      },
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
