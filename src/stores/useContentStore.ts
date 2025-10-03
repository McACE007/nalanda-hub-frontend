import { API_BASE_URL } from "@/config/api";
import axios, { isAxiosError } from "axios";
import { create } from "zustand";

type ContentStore = {
  isLoading: boolean;
  error: string | null;
  createContent: (formData: FormData) => Promise<boolean>;
  deleteContent: (contentId: number) => Promise<boolean>;
  //   updateContent: (contentId: string, formData: FormData) => Promise<boolean>;
};

export const useContentStore = create<ContentStore>((set) => ({
  isLoading: false,
  error: null,
  createContent: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_BASE_URL}/user/contents`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error(error);
      set({
        isLoading: false,
        error: isAxiosError(error)
          ? error.response?.data?.message || error.response?.data?.error || error.message
          : "Failed to create content",
      });
      return false;
    }
  },
  deleteContent: async (contentId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/user/contents/${contentId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error(error);
      set({
        isLoading: false,
        error: isAxiosError(error)
          ? error.response?.data?.message || error.response?.data?.error || error.message
          : "Failed to delete content",
      });
      return false;
    }
  },
  //   updateContent: (contentId, formData) => {},
}));
