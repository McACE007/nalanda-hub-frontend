import { API_BASE_URL } from "@/config/api";
import { useContentStore } from "@/stores/useContentStore";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export type Request = {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestType: "NewContent" | "UpdateContent" | "UploadContent";

  rejectionReason?: string;
  newContentUrl?: string;

  branchId: number;
  semesterId: number;
  subjectId: number;
  unitId: number;
};

type ApiResponse = {
  success: boolean;
  data: Request[];
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

export const useMyRequests = () => {
  return useInfiniteQuery({
    queryKey: ["myRequests"],
    queryFn: async ({ pageParam = 1 }): Promise<ApiResponse> => {
      const response = await axios.get(`${API_BASE_URL}/user/requests`, {
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
