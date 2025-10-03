import { API_BASE_URL } from "@/config/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type Notification = {
  id: number;
  title: string;
  type: "NewContentUpdate" | "RequestForContent" | "Approved" | "Rejected";
  contentUrl: string | null;
  createdAt: string;
  userId: number;
};

type ApiResponse = {
  success: boolean;
  data: Notification[];
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

export const useNotification = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam = 1 }): Promise<ApiResponse> => {
      const response = await axios.get(`${API_BASE_URL}/notifications`, {
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
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: true,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
  });
};
