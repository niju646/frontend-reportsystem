// src/App.tsx
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

function App() {
  const { accessToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!accessToken);

  useEffect(() => {
    console.log("Access token changed:", accessToken);
    const loggedIn = !!accessToken;
    console.log("Setting isLoggedIn to:", loggedIn);
    setIsLoggedIn(loggedIn);
  }, [accessToken]);

  console.log("Rendering App, isLoggedIn:", isLoggedIn);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </QueryClientProvider>
  );
}

export default App;

// // src/App.tsx
// import { useState, useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Login } from "./components/Login";
// import { Dashboard } from "./components/Dashboard";
// import { useAuth } from "./hooks/useAuth";

// const queryClient = new QueryClient();

// function App() {
//   const { accessToken } = useAuth();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

//   useEffect(() => {
//     console.log("Access token updated:", accessToken);
//     setIsLoggedIn(!!accessToken);
//   }, [accessToken]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       {isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />}
//     </QueryClientProvider>
//   );
// }

// export default App;