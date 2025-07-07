import { API_ROUTES } from "@/config/api";
import axios, { isAxiosError } from "axios";
import { create } from "zustand";

export type Content = {
  id: number;
  title: string;
  imageUrl: string;
  uploadedBy: number;
  uploadedDate: Date;
  status: boolean;
  description?: string;
  relatedVideos: string[];
  branchId: number;
  semesterId: number;
  subjectId: number;
  unitId: number;
  fileId: number;
};

type ContentState = {
  contents: Content[];
  content: Content | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string | null;
  semster: number;
  subject: number;
  unit: number;
  sortBy: string;
  setSearchQuery: (search: string) => Promise<void>;
  setSortBy: (sortBy: string) => void;
  fetchContentById: (contentId: number) => Promise<boolean>;
  fetchAllContents: () => Promise<boolean>;
};

const axiosInstance = axios.create({
  baseURL: API_ROUTES.CONTENT,
});

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  content: null,
  isLoading: false,
  error: null,
  searchQuery: null,
  sortBy: "newest",
  semster: 0,
  subject: 0,
  unit: 0,
  fetchContentById: async (contentId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/${contentId}`);
      set({ isLoading: false, content: response.data.content });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: isAxiosError(error)
          ? error.response?.data.error
          : "Falied to fetch content",
      });
      console.error(error);
      return false;
    }
  },
  fetchAllContents: async () => {
    set({ isLoading: true, error: null });
    const { sortBy } = get();
    const { searchQuery } = get();
    try {
      const response = await axiosInstance.get(`/`, {
        params: {
          search: searchQuery || undefined,
          sortBy: sortBy || undefined,
        },
      });
      set({ isLoading: false, contents: response.data.contents });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: isAxiosError(error)
          ? error.response?.data.error
          : "Falied to fetch all contents",
      });
      console.error(error);
      return false;
    }
  },
  setSearchQuery: async (search) => {
    set({ searchQuery: search });
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
  },
}));
