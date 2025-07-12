import { create } from "zustand";

type FilterState = {
  filters: {
    searchQuery: string;
    sortBy: string;
    subject: string;
    semester: string;
    unit: string;
  };
  setFilters: (filters: Partial<FilterState["filters"]>) => void;
  resetFilters?: () => void;
};

const initialFilters: FilterState["filters"] = {
  searchQuery: "",
  sortBy: "newest",
  subject: "all",
  semester: "all",
  unit: "all",
};

export const useFilters = create<FilterState>((set) => ({
  filters: initialFilters,
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: initialFilters,
    })),
}));
