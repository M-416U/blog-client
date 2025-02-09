import { useCallback } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axios";

export type Theme = "light" | "dark";
export type Language = "en" | "ar";

interface UserPreferences {
  theme?: Theme;
  lang?: Language;
  emailNotifications?: boolean;
  preferredTags?: string[];
}

export const useUserPreferences = () => {
  const { token } = useAuthStore();

  const savePreferences = useCallback(
    async (preferences: Partial<UserPreferences>) => {
      if (!token) return;

      try {
        await api.post("/users/preferences", preferences, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Failed to save preferences:", error);
        throw error;
      }
    },
    [token]
  );

  return { savePreferences };
};
