import { API_BASE_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Content = {
  id: number;
  branchId: number;
  title: string;
  description: string;
  imageUrl: string;
  status: boolean;
  uploadedDate: Date;
  updatedAt: Date;
  uploadedBy: number;
  semesterId: number;
  subjectId: number;
  unitId: number;
  fileId: number | null;
  Uploader: {
    id: number;
    email: string;
    fullName: string;
    branchId: number;
  };
  Branch: {
    name: string;
    id: number;
    duration: number;
  };
  Semester: {
    name: string;
    id: number;
    branchId: number;
  };
  Subject: {
    name: string;
    id: number;
    semesterId: number;
  };
  Unit: {
    name: string;
    id: number;
    subjectId: number;
  };
  File: {
    name: string;
    id: number;
    contentId: number;
    url: string;
    size: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: Content;
};

export const useContent = (contentId: number) => {
  return useQuery({
    queryKey: ["content"],
    queryFn: async (): Promise<ApiResponse> => {
      const response = await axios.get(
        `${API_BASE_URL}/contents/${contentId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    },
  });
};
