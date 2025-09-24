import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";  // Removed, using window.location

// ✅ Validation Schema
const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// ✅ Background images
const images = [
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
];

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();  // Removed, using window.location

  // ✅ Background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Submit Handler with fetch
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.message === "Invalid credentials") {
          setErrorMessage("User doesn't exist");
        } else {
          setErrorMessage(result.message || "Login failed ❌");
        }
        setLoading(false);
        return;
      }

      // Save token + user info
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      alert("Login successful ✅");
      setLoading(false);
      window.location.href = '/Carpage';
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-1000"></div>

      {/* Card */}
      <div className="relative bg-white/95 backdrop-blur-sm px-6 py-8 rounded-2xl shadow-2xl w-[92%] max-w-md">
        {/* Logo + Company Name */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="/logopic.png"
            alt="AutoHub Dealer Logo"
            className="w-28 h-20 object-contain drop-shadow-md"
          />
          <h1 className="text-2xl font-bold text-blue-700">AutoHub Dealer</h1>
        </div>
        {/* Error Message */}
        {errorMessage && (
          <div className="text-center text-red-600 font-medium p-2 mb-2 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
          <p className="text-gray-600 text-sm mt-1">Welcome back! Please log in</p>
  {/* Form */}
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span
              className="absolute top-3 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 rounded-lg shadow-md transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="text-white text-lg" />
            ) : (
              "Login"
            )}
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600 mt-3 text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;




