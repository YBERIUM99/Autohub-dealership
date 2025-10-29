import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

 export const AuthProvider = ({ children }) => {
  const [signingUp, setSigningUp] = useState(false);
  const [logingIn, setLoginIn] = useState(false);
  const [user, setUser] = useState(null);

  const baseUrl = "https://autohub-dealership-backend.onrender.com/api";

  const navigate = useNavigate();

  // SIGN UP
  const signup = async (data) => {
    if (data.confirmPassword !== data.password) {
      toast.error("Passwords do not match");
      return;
    }

    setSigningUp(true);
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Please verify your email.");
      } else {
        toast.error(resData.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to sign up");
    } finally {
      setSigningUp(false);
    }
  };

  // LOGIN
  const login = async (data) => {
    setLoginIn(true);
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok) {
        toast.success("Login successful!");

        if (resData.token) {
          localStorage.setItem("token", resData.token);
          await fetchUser(); 
          navigate("/Carspage"); 
        }
      } else {
        toast.error(resData.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to login");
    } finally {
      setLoginIn(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login"); 
  };

  // FETCH USER from backend
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user); 
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  // Fetch user once app loads
  useEffect(() => {
    fetchUser();
  }, []);

  const value = { logingIn, signingUp, signup, login, logout, user, fetchUser };

  return (
    <authContext.Provider value={value}>{children}</authContext.Provider>
  );
};

export default AuthProvider;


