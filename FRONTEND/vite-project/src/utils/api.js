export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const isAuthenticated = () => !!localStorage.getItem("token");
