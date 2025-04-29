import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  /* Register */
  register: async (username, email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://taskmates-8wmg.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", JSON.stringify(data.token));
        set({ user: data.user, token: data.token, isLoading: false });
        return { success: true };
      } else {
        set({ isLoading: false });
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  /* Login */
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://taskmates-8wmg.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", JSON.stringify(data.token));
        set({ user: data.user, token: data.token, isLoading: false });
        return { success: true };
    } else {
        set({ isLoading: false });
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

/* Logout */
  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null });
    } catch (error) {
      console.log("Error in logout", error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("AuthCheck failed", error);
    }
  },
}));
