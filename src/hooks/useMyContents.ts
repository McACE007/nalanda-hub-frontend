import { API_BASE_URL } from "@/config/api";
import { useContentStore } from "@/stores/useContentStore";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export type Content = {
  id: number;
  title: string;
  imageUrl: string;
  uploadedDate: Date;
  updatedAt: Date;
  status: boolean;
  branchId: number;
  semesterId: number;
  subjectId: number;
  unitId: number;
  fileId: number;
  Semester: {
    name: string;
  };
  Subject: {
    name: string;
  };
  Unit: {
    name: string;
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

export const useMyContents = () => {
  return useInfiniteQuery({
    queryKey: ["myContents"],
    queryFn: async ({ pageParam = 1 }): Promise<ApiResponse> => {
      const response = await axios.get(`${API_BASE_URL}/user/contents`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          page: pageParam,
          perPage: 6,
        },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });
};
export const useCreateContent = () => {
  const queryClient = useQueryClient();
  const { createContent } = useContentStore();

  return useMutation({
    mutationFn: createContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myContents"] });
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  const { deleteContent } = useContentStore();

  return useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myContents"] });
    },
  });
};
