import { API_ROUTES } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ROUTES.UNIT,
});

export const useUnits = (subject: string) => {
  return useQuery({
    queryKey: ["units", subject],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axiosInstance.get("", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          subject,
        },
      });
      return response.data.units;
    },
    enabled: subject !== "all" && subject !== "",
  });
};
