// src/hooks/useReport.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse, Report } from "../types";
import { useAuth } from "./useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export const useReport = (notificationId: number) => {
  const { accessToken, refresh } = useAuth();
  const queryClient = useQueryClient();

  const fetchReport = async (): Promise<Report> => {
    console.log("Fetching report for notificationId:", notificationId);
    try {
      const response = await axios.get<ApiResponse<Report>>(`${API_URL}/report/${notificationId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Report response:", response.data);
      if (!response.data.success) throw new Error(response.data.error || "Failed to fetch report");
      return response.data.data!;
    } catch (error: any) {
      console.error("Fetch report error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      if (error.response?.status === 401) {
        console.log("Access token expired, attempting to refresh...");
        const newToken = await refresh();
        const retryResponse = await axios.get<ApiResponse<Report>>(`${API_URL}/report/${notificationId}`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        console.log("Retry response after refresh:", retryResponse.data);
        if (!retryResponse.data.success) throw new Error(retryResponse.data.error || "Failed after refresh");
        return retryResponse.data.data!;
      }
      throw new Error(error.response?.data?.error || error.message || "Failed to fetch report");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["report", notificationId],
    queryFn: fetchReport,
    enabled: !!accessToken && !isNaN(notificationId) && notificationId > 0,
  });

  const refreshReport = async () => {
    console.log("Refreshing report for notificationId:", notificationId);
    await refetch();
    console.log("Refetch completed");
  };

  return { report: data, error, isLoading, refreshReport };
};



// // src/hooks/useReport.ts
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { ApiResponse, Report } from "../types";
// import { useAuth } from "./useAuth";

// const API_URL = import.meta.env.VITE_API_URL;

// export const useReport = (notificationId: number) => {
//   const { accessToken, refresh } = useAuth();
//   const queryClient = useQueryClient();

//   const fetchReport = async (): Promise<Report> => {
//     console.log("Fetching report for notificationId:", notificationId);
//     try {
//       const response = await axios.get<ApiResponse<Report>>(`${API_URL}/report/${notificationId}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       console.log("Report response:", response.data);
//       if (!response.data.success) throw new Error(response.data.error || "Failed to fetch report");
//       return response.data.data!;
//     } catch (error: any) {
//       console.error("Fetch report error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       if (error.response?.status === 401) {
//         console.log("Access token expired, attempting to refresh...");
//         const newToken = await refresh();
//         const retryResponse = await axios.get<ApiResponse<Report>>(`${API_URL}/report/${notificationId}`, {
//           headers: { Authorization: `Bearer ${newToken}` },
//         });
//         console.log("Retry response after refresh:", retryResponse.data);
//         if (!retryResponse.data.success) throw new Error(retryResponse.data.error || "Failed after refresh");
//         return retryResponse.data.data!;
//       }
//       throw error;
//     }
//   };

//   const { data, error, isLoading, refetch } = useQuery({
//     queryKey: ["report", notificationId],
//     queryFn: fetchReport,
//     enabled: !!accessToken,
//   });

//   const refreshReport = async () => {
//     console.log("Refreshing report for notificationId:", notificationId);
//     await refetch();
//     console.log("Refetch completed");
//   };

//   return { report: data, error, isLoading, refreshReport };
// };

// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { ApiResponse, Report } from "../types";
// import { useAuth } from "./useAuth";

// const API_URL = import.meta.env.VITE_API_URL;

// export const useReport = (notificationId: number) => {
//   const { accessToken, refresh } = useAuth();
//   const queryClient = useQueryClient();

//   const fetchReport = async (): Promise<Report> => {
//     try {
//       const response = await axios.get<ApiResponse<Report>>(`${API_URL}/report/${notificationId}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (!response.data.success) throw new Error(response.data.error || "Failed to fetch report");
//       return response.data.data!;
//     } catch (error: any) {
//       if (error.response?.status === 401) {
//         const newToken = await refresh();
//         const retryResponse = await axios.get<ApiResponse<Report>>(`${API_URL}/report/${notificationId}`, {
//           headers: { Authorization: `Bearer ${newToken}` },
//         });
//         if (!retryResponse.data.success) throw new Error(retryResponse.data.error || "Failed after refresh");
//         return retryResponse.data.data!;
//       }
//       throw error;
//     }
//   };

//   const { data, error, isLoading, refetch } = useQuery({
//     queryKey: ["report", notificationId],
//     queryFn: fetchReport,
//     enabled: !!accessToken,
//   });

//   const refreshReport = () => refetch();

//   return { report: data, error, isLoading, refreshReport };
// };