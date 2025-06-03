import { useEffect, useState } from "react";

export const useLoadUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
    const handleUserChange = () => loadUser();
    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  return { user, loading };
};
