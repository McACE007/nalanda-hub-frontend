import { API_ROUTES } from "@/config/api";
import { useFilters } from "@/stores/useFilterStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ROUTES.CONTENT,
});

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
  File?: {
    id: number;
    name: string;
    url: string;
    size: number;
    type: 'pdf' | 'txt' | 'docs';
  };
};

type ApiResponse = {
  success: boolean;
  data: Content[];
  meta: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
    pageSize: number;
  };
};

export const useContents = () => {
  const { filters } = useFilters();

  return useInfiniteQuery({
    queryKey: ["contents", filters],
    queryFn: async ({ pageParam = 1 }): Promise<ApiResponse> => {
      const response = await axiosInstance.get("", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          ...filters,
          page: pageParam,
          perPage: 6,
          search: filters.searchQuery,
        },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });
};
