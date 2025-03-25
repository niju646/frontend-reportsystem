export interface User {
    id: string;
    role: "admin" | "teacher";
  }
  
  export interface Status {
    type: string;
    recipient: string;
    messageSid: string | null;
    status: string;
    dateUpdated: string;
    errorMessage: string | null;
  }
  
  export interface Report {
    notificationId: number;
    statuses: Status[];
    total: number;
    summary: {
      delivered: number;
      sent: number;
      failed: number;
      pending: number;
    };
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
  }