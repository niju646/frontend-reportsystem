// src/hooks/useAuth.ts
import { useState } from "react";
import axios from "axios";
import { AuthResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL is not defined. Please check your .env file.");
  throw new Error("VITE_API_URL is not defined");
}

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));

  const login = async (id: string, role: "admin" | "teacher") => {
    try {
      console.log("Attempting login with:", { id, role, url: `${API_URL}/login` });
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, { id, role });
      console.log("Login response:", response.data);
      const { accessToken, refreshToken } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error: any) {
      console.error("Login failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  };

  const refresh = async () => {
    if (!refreshToken) throw new Error("No refresh token available");
    const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, { refreshToken });
    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  };

  const logout = async () => {
    try {
      console.log("Starting logout process...");
      console.log("Current tokens:", { accessToken, refreshToken });
      if (refreshToken && accessToken) {
        console.log("Sending logout request to:", `${API_URL}/logout`);
        const response = await axios.post(
          `${API_URL}/logout`,
          { refreshToken },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log("Logout API response:", response.data);
      } else {
        console.warn("No tokens available to logout");
      }
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log("Logout completed, tokens cleared");
    } catch (error: any) {
      console.error("Logout failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      // Clear tokens even if API call fails
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log("Tokens cleared despite API failure");
    }
  };

  return { accessToken, refreshToken, login, refresh, logout };
};


// // src/hooks/useAuth.ts
// import { useState } from "react";
// import axios from "axios";
// import { AuthResponse } from "../types";

// const API_URL = import.meta.env.VITE_API_URL;
// console.log("VITE_API_URL:", import.meta.env.VITE_API_URL); // Debug log

// export const useAuth = () => {
//   const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
//   const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));

//   const login = async (id: string, role: "admin" | "teacher") => {
//     try {
//       console.log("Attempting login with:", { id, role, url: `${API_URL}/login` });
//       const response = await axios.post<AuthResponse>(`${API_URL}/login`, { id, role });
//       console.log("Login response:", response.data);
//       const { accessToken, refreshToken } = response.data;
//       setAccessToken(accessToken);
//       setRefreshToken(refreshToken);
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//     } catch (error: any) {
//       console.error("Login failed:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw error;
//     }
//   };

//   const refresh = async () => {
//     if (!refreshToken) throw new Error("No refresh token available");
//     const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, { refreshToken });
//     const newAccessToken = response.data.accessToken;
//     setAccessToken(newAccessToken);
//     localStorage.setItem("accessToken", newAccessToken);
//     return newAccessToken;
//   };

//   const logout = async () => {
//     if (refreshToken && accessToken) {
//       await axios.post(`${API_URL}/logout`, { refreshToken }, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//     }
//     setAccessToken(null);
//     setRefreshToken(null);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   };

//   return { accessToken, refreshToken, login, refresh, logout };
// };