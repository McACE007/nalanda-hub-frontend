import { API_ROUTES } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ROUTES.SUBJECT,
});

export const useSubjects = (semester: string) => {
  return useQuery({
    queryKey: ["subjects", semester],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axiosInstance.get("", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          semester,
        },
      });
      return response.data.subjects;
    },
    enabled: semester !== "all" && semester !== "",
  });
};
