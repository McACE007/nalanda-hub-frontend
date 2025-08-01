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

export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post(`${API_BASE_URL}/user/requests`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequests"] });
    },
  });
};
