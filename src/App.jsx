import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "../pages/signup";
import { AuthProvider } from "./contexts/Authcontext";
import { Toaster } from "sonner";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import "./styles/auth.css";
import Verify from "../pages/Verify";
import Carpage from "../pages/Carpage";   // capitalized C
import SingleCar from "../pages/SingleCar";
import ProtectedRoute from "./contexts/ProtectedRoute";
import SellACar from "../pages/SellACar";

function App() {
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster closeButton position="top-right" richColors />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/Carpage" element={<Carpage />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Carpage /> </ProtectedRoute>} />
          <Route path="/car/:id" element={<SingleCar />} />
          <Route path="/Profile" element={token ? <Profile /> : <Navigate to="/login" />}/>
          <Route path="/SellACar" element={<ProtectedRoute><SellACar /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

