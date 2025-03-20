// frontend/components/ProtectedRoute.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;