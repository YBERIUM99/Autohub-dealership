import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";

// 
const signUpSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Surname is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// 
const images = [
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
  "https://i.etsystatic.com/27448350/r/il/779fea/4681213823/il_794xN.4681213823_272d.jpg",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
];

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 

  //  Background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  //  Submit Handler with fetch
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Signup request
      const res = await fetch("https://autohub-dealership-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Signup failed ❌");
        setLoading(false);
        return;
      }

      // show success message
      setSuccessMessage(
        "🎉 Account created successfully! Please check your email to verify your account."
      );
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
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
          <p className="text-gray-600 text-sm mt-1">
            Join us and explore the best car deals
          </p>
        </div>

        {/*  Success Message */}
        {successMessage ? (
          <div className="text-center text-green-600 font-medium p-4 bg-green-100 rounded-lg">
            {successMessage}
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Surname"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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

            {/* Password Row */}
            <div className="flex gap-3">
              {/* Password */}
              <div className="flex-1 relative">
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

              {/* Confirm Password */}
              <div className="flex-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span
                  className="absolute top-3 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-white text-lg" />
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-3 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;

