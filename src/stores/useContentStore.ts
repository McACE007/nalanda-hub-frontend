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
  semesters: { name: string; id: number }[];
  selectedSemster: number | null;
  subject: number;
  unit: number;
  sortBy: string;
  setSeletedSemester: (value: string) => void;
  setSearchQuery: (search: string) => Promise<void>;
  setSortBy: (sortBy: string) => void;
  fetchContentById: (contentId: number) => Promise<boolean>;
  fetchAllContents: () => Promise<boolean>;

  fetchAllSemesters: () => Promise<void>;
};

const axiosInstance = axios.create({
  baseURL: API_ROUTES.CONTENT,
});

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  content: null,
  isLoading: true,
  error: null,
  searchQuery: null,
  sortBy: "newest",
  semesters: [],
  selectedSemster: null,
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
    const { searchQuery, sortBy, selectedSemster } = get();
    try {
      const response = await axiosInstance.get(`/`, {
        params: {
          search: searchQuery || undefined,
          sortBy: sortBy || undefined,
          semester: selectedSemster || undefined,
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
  setSeletedSemester: (value: string) => {
    set({ selectedSemster: Number(value) || null });
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
  },
  fetchAllSemesters: async () => {
    set({ error: null });
    try {
      const response = await axios.get(API_ROUTES.SEMESTER, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      set({ semesters: response.data.semesters });
    } catch (error) {
      console.error(error);
      set({
        error: isAxiosError(error)
          ? error.response?.data.error
          : "Falied to fetch all semesters",
      });
    }
  },
}));
