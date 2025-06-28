import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { isAxiosError } from "axios";
import { API_ROUTES } from "@/config/api";

type User = {
  id: Number;
  fullName: string;
  email: string;
  role: "USER" | "MOD" | "ADMIN";
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<string | null>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const axiosInstance = axios.create({
  baseURL: API_ROUTES.AUTH,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      register: async (fullName, email, password, confirmPassword) => {
        try {
          set({ isLoading: true });
          const response = await axiosInstance.post("/register", {
            fullName,
            email,
            password,
            confirmPassword,
          });
          set({ isLoading: false });
          console.log(response, "response");
          return response.data.userId;
        } catch (error) {
          console.error("ERROR: ", error);
          set({
            isLoading: false,
            error: isAxiosError(error)
              ? error.response?.data.error
              : "Registration failed",
          });
        }
      },
      login: async (email, password) => {
        try {
          set({ isLoading: true });
          const response = await axiosInstance.post("/login", {
            email,
            password,
          });
          localStorage.setItem("token", response.data.token);
          set({ user: response.data.user });
          set({ isLoading: false });
          return true;
        } catch (error) {
          console.error("ERROR: ", error);
          set({
            isLoading: false,
            error: isAxiosError(error)
              ? error.response?.data.error
              : "Login failed",
          });
          return false;
        }
      },
      logout: async () => {
        try {
          set({ isLoading: true });
          localStorage.removeItem("token");
          set({ user: null });
          set({ isLoading: false });
        } catch (error) {
          console.error("ERROR: ", error);
          set({
            isLoading: false,
            error: isAxiosError(error)
              ? error.response?.data.error
              : "Logout failed",
          });
        }
      },
    }),
    { name: "auth-storage", partialize: (state) => ({ user: state.user }) }
  )
);
