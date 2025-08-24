import { API_BASE_URL } from "@/config/api";
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

export const useAssignedRequests = () => {
  return useInfiniteQuery({
    queryKey: ["assignedRequests"],
    queryFn: async ({ pageParam = 1 }): Promise<ApiResponse> => {
      const response = await axios.get(
        `${API_BASE_URL}/moderator/requests/assigned-requests`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            page: pageParam,
            perPage: 6,
          },
        }
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });
};

export const useAssignAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      action,
      rejectionReason,
    }: {
      id: number;
      action: "approve" | "reject";
      rejectionReason?: string;
    }) => {
      const url = `${API_BASE_URL}/moderator/requests/assigned-requests/${id}/${action}`;
      await axios.post(url, action === "reject" ? { rejectionReason } : {}, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignedRequests"] });
    },
  });
};
