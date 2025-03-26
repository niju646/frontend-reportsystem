// // src/components/Dashboard.tsx
// import { useState } from "react";
// import { useReport } from "../hooks/useReport";
// import { ReportTable } from "./ReportTable";
// import { FaSync } from "react-icons/fa";
// import { useAuth } from "../hooks/useAuth";

// export const Dashboard = () => {
//   const [notificationIdInput, setNotificationIdInput] = useState<string>("1"); // Store input as string
//   const [notificationId, setNotificationId] = useState<number>(1); // Parsed number for API
//   const [inputError, setInputError] = useState<string | null>(null);
//   const { report, isLoading, error, refreshReport } = useReport(notificationId);
//   const { logout } = useAuth();
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const handleNotificationIdChange = (value: string) => {
//     setNotificationIdInput(value);
//     const parsedId = parseInt(value);
//     if (isNaN(parsedId) || parsedId <= 0) {
//       setInputError("Please enter a valid positive number");
//       setNotificationId(1); // Fallback to default
//     } else {
//       setInputError(null);
//       setNotificationId(parsedId);
//     }
//   };

//   const handleRefresh = async () => {
//     if (inputError) return; // Prevent refresh if input is invalid
//     setIsRefreshing(true);
//     try {
//       await refreshReport();
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   const handleLogout = async () => {
//     console.log("Logout button clicked");
//     await logout();
//     location.reload();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Notification Status Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <div className="flex items-center mb-4">
//             <div className="flex-1">
//               <input
//                 type="number"
//                 value={notificationIdInput}
//                 onChange={(e) => handleNotificationIdChange(e.target.value)}
//                 className="p-2 border rounded mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
//                 placeholder="Enter Notification ID"
//                 min="1"
//               />
//               {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
//             </div>
//             <button
//               onClick={handleRefresh}
//               className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-blue-300"
//               disabled={isRefreshing || !!inputError}
//             >
//               <FaSync className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
//               {isRefreshing ? "Refreshing..." : "Refresh"}
//             </button>
//           </div>
//           {(isLoading || isRefreshing) && <p className="text-center text-gray-500">Loading...</p>}
//           {error && <p className="text-center text-red-500">Error: {error.message}</p>}
//           {report && (
//             <>
//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold">Report for Notification ID: {report.notificationId}</h2>
//                 <p className="text-gray-600">Total: {report.total}</p>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//                   <div className="bg-green-100 p-3 rounded text-center">
//                     <p className="font-semibold text-green-700">Delivered</p>
//                     <p>{report.summary.delivered}</p>
//                   </div>
//                   <div className="bg-blue-100 p-3 rounded text-center">
//                     <p className="font-semibold text-blue-700">Sent</p>
//                     <p>{report.summary.sent}</p>
//                   </div>
//                   <div className="bg-red-100 p-3 rounded text-center">
//                     <p className="font-semibold text-red-700">Failed</p>
//                     <p>{report.summary.failed}</p>
//                   </div>
//                   <div className="bg-yellow-100 p-3 rounded text-center">
//                     <p className="font-semibold text-yellow-700">Pending</p>
//                     <p>{report.summary.pending}</p>
//                   </div>
//                 </div>
//               </div>
//               <ReportTable statuses={report.statuses} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



// src/components/Dashboard.tsx
import { useState } from "react";
import { useReport } from "../hooks/useReport";
import { ReportTable } from "./ReportTable";
import { FaSync } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export const Dashboard = () => {
  const [notificationIdInput, setNotificationIdInput] = useState<string>("1");
  const [notificationId, setNotificationId] = useState<number>(1);
  const [inputError, setInputError] = useState<string | null>(null);
  const { report, isLoading, error, refreshReport } = useReport(notificationId);
  const { logout } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleNotificationIdChange = (value: string) => {
    setNotificationIdInput(value);
    const parsedId = parseInt(value);
    if (isNaN(parsedId) || parsedId <= 0) {
      setInputError("Please enter a valid positive number");
      setNotificationId(1);
    } else {
      setInputError(null);
      setNotificationId(parsedId);
    }
  };

  const handleRefresh = async () => {
    if (inputError) return;
    setIsRefreshing(true);
    try {
      await refreshReport();
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    await logout();
    location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notification Status Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="flex-1">
              <input
                type="number"
                value={notificationIdInput}
                onChange={(e) => handleNotificationIdChange(e.target.value)}
                className="p-2 border rounded mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
                placeholder="Enter Notification ID"
                min="1"
              />
              {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-blue-300"
              disabled={isRefreshing || !!inputError}
            >
              <FaSync className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          {(isLoading || isRefreshing) && <p className="text-center text-gray-500">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">
              {error.message === "Session expired, please log in again"
                ? "Your session has expired. Please log in again."
                : `Error: ${error.message}`}
            </p>
          )}
          {report && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Report for Notification ID: {report.notificationId}</h2>
                <p className="text-gray-600">Total: {report.total}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div className="bg-green-100 p-3 rounded text-center">
                    <p className="font-semibold text-green-700">Delivered</p>
                    <p>{report.summary.delivered}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded text-center">
                    <p className="font-semibold text-blue-700">Sent</p>
                    <p>{report.summary.sent}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded text-center">
                    <p className="font-semibold text-red-700">Failed</p>
                    <p>{report.summary.failed}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded text-center">
                    <p className="font-semibold text-yellow-700">Pending</p>
                    <p>{report.summary.pending}</p>
                  </div>
                </div>
              </div>
              <ReportTable statuses={report.statuses} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};