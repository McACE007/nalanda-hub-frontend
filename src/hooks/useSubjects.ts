import { API_ROUTES } from "@/config/api";
import { useFilters } from "@/stores/useFilterStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ROUTES.SUBJECT,
});

export const useSubjects = () => {
  const semester = useFilters((state) => state.filters.semester);

  return useQuery({
    queryKey: ["subjects"],
    queryFn: async (): Promise<{ name: string; id: number }[]> => {
      const response = await axiosInstance.get("/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          semester,
        },
      });
      return response.data.subjects;
    },
    enabled: semester !== "all",
  });
};
