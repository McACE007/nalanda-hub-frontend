import { API_ROUTES } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ROUTES.BRANCH,
});

export const useBranches = () => {
  return useQuery({
    queryKey: ["branches"],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axiosInstance.get("/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data.branches;
    },
  });
};