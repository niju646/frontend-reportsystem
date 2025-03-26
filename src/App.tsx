// // src/App.tsx
// import { useState, useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Login } from "./components/Login";
// import { Dashboard } from "./components/Dashboard";
// import { useAuth } from "./hooks/useAuth";

// const queryClient = new QueryClient();

// function App() {
//   const { accessToken } = useAuth();
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!accessToken);

//   useEffect(() => {
//     console.log("Access token changed:", accessToken);
//     const loggedIn = !!accessToken;
//     console.log("Setting isLoggedIn to:", loggedIn);
//     setIsLoggedIn(loggedIn);
//   }, [accessToken]);

//   console.log("Rendering App, isLoggedIn:", isLoggedIn);

//   return (
//     <QueryClientProvider client={queryClient}>
//       {isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />}
//     </QueryClientProvider>
//   );
// }

// export default App;

// src/App.tsx
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  const { accessToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

  useEffect(() => {
    console.log("Access token changed:", accessToken);
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
              <p className="mt-2">Please try logging in again.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Refresh
              </button>
            </div>
          </div>
        }
      >
        {isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />}
      </ErrorBoundary> */}
      {isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </QueryClientProvider>
  );
}

export default App;