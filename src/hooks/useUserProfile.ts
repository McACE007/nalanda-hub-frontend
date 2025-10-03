import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ROUTES } from "@/config/api";

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "MOD" | "ADMIN";
  branchId: number;
  Branch: {
    id: number;
    name: string;
    duration: number;
  };
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async (): Promise<UserProfile> => {
      const { data } = await axios.get(`${API_ROUTES.AUTH}/profile`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return data;
    },
  });
};