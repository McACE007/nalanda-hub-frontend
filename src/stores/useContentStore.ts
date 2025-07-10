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
  subjects: { name: string; id: number }[];
  units: { name: string; id: number }[];
  selectedSemster: number | null;
  selectedSubject: number | null;
  selectedUnit: number | null;
  sortBy: string;
  setSeletedSemester: (value: string) => void;
  setSeletedSubject: (value: string) => void;
  setSeletedUnit: (value: string) => void;
  setSearchQuery: (search: string) => Promise<void>;
  setSortBy: (sortBy: string) => void;
  fetchContentById: (contentId: number) => Promise<boolean>;
  fetchAllContents: () => Promise<boolean>;

  fetchAllSemesters: () => Promise<void>;
  fetchAllSubjects: (semesterId: string) => Promise<void>;
  fetchAllUnits: (subjectId: string) => Promise<void>;
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
  subjects: [],
  units: [],
  selectedSemster: null,
  selectedSubject: null,
  selectedUnit: null,
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
    const {
      searchQuery,
      sortBy,
      selectedSemster,
      selectedSubject,
      selectedUnit,
    } = get();
    try {
      const response = await axiosInstance.get(`/`, {
        params: {
          search: searchQuery || undefined,
          sortBy: sortBy || undefined,
          semester: selectedSemster || undefined,
          subject: selectedSubject || undefined,
          unit: selectedUnit || undefined,
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
  setSeletedSubject: (value: string) => {
    set({ selectedSubject: Number(value) || null });
  },
  setSeletedUnit: (value: string) => {
    set({ selectedUnit: Number(value) || null });
  },
  fetchAllSubjects: async (semesterId) => {
    set({ error: null });
    try {
      const response = await axios.get(API_ROUTES.SUBJECT, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
        params: {
          semester: semesterId,
        },
      });
      set({ subjects: response.data.subjects });
    } catch (error) {
      console.error(error);
      set({
        error: isAxiosError(error)
          ? error.response?.data.error
          : "Falied to fetch all subjects",
      });
    }
  },
  fetchAllUnits: async (subjectId) => {
    set({ error: null });
    try {
      const response = await axios.get(API_ROUTES.UNIT, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
        params: {
          subject: subjectId,
        },
      });
      set({ units: response.data.units });
    } catch (error) {
      console.error(error);
      set({
        error: isAxiosError(error)
          ? error.response?.data.error
          : "Falied to fetch all units",
      });
    }
  },
}));
