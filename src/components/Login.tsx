// src/components/Login.tsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [id, setId] = useState("");
  const [role, setRole] = useState<"admin" | "teacher">("admin");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(id, role);
      onLogin();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Login failed";
      setError(errorMessage);
      console.error("Login error details:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "teacher")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};