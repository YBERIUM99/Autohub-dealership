import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    fetch(`https://autohub-dealership-backend.onrender.com/api/auth/verify/${token}`)
      .then(res => {
        if (res.ok) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 4000);
        } else {
          setStatus("error");
          setTimeout(() => navigate("/signup"), 4000);
        }
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => navigate("/signup"), 4000);
      });
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {status === "verifying" && <h2 className="text-xl font-bold">Verifying...</h2>}
      {status === "success" && (
        <h2 className="text-xl font-bold text-green-600">
          ✅ Account verified successfully<br />
          Redirecting to login page in 4 seconds...
        </h2>
      )}
      {status === "error" && (
        <h2 className="text-xl font-bold text-red-600">
          ❌ Invalid or expired token<br />
          Redirecting to signup page in 4 seconds...
        </h2>
      )}
    </div>
  );
};

export default Verify;
