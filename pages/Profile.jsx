// src/pages/Profile.jsx
import React, { useEffect, useState, useContext, useRef } from "react";
import { authContext } from "../src/contexts/Authcontext";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, fetchUser } = useContext(authContext);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    dob: "",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api";

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user?.phone || "",
        address: user?.address || "",
        dob: user?.dob ? user.dob.split("T")[0] : "", // format for input[type="date"]
      });
    }
  }, [user]);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Autohub"); // <-- replace with your Cloudinary preset
      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dvjis8d3y/image/upload", // <-- replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Cloud upload failed");

      const res = await fetch(`${baseUrl}/auth/profile-picture`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ profilePicture: cloudData.secure_url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      toast.success("Profile picture updated!");
      await fetchUser();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle Save Profile
  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      toast.success("Profile updated successfully!");
      await fetchUser();
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              user?.profilePicture ||
              `https://ui-avatars.com/api/?name=${
                user?.firstName || "U"
              }+${user?.lastName || "S"}&background=random`
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover ring-2 ring-gray-200 shadow-sm"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleProfileUpload}
          />
          <button
            className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium underline"
            disabled={uploading}
            onClick={() => fileInputRef.current.click()}
          >
            {uploading ? "Uploading..." : "Change Picture"}
          </button>
        </div>

        {/* User Info */}
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {user?.firstName || user?.name?.split(" ")[0] || "Your Name"}{" "}
            {user?.lastName || user?.name?.split(" ")[1] || ""}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email || "email@example.com"}
          </p>
        </div>

        {/* Info Fields */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">First Name</p>
            <p className="text-gray-900">
              {user?.firstName || user?.name?.split(" ")[0] || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Last Name</p>
            <p className="text-gray-900">
              {user?.lastName ||
                (user?.name?.split(" ").length > 1
                  ? user?.name?.split(" ")[1]
                  : "") ||
                "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
            <p className="text-gray-900">{user?.email || "N/A"}</p>
          </div>

          {/* Editable Fields */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
            {editing ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-900">{user?.phone || "N/A"}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
            {editing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-900">{user?.address || "N/A"}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Date of Birth</p>
            {editing ? (
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-900">{user?.dob ? user.dob.split("T")[0] : "N/A"}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          {!editing ? (
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition"
              onClick={() => setEditing(true)}
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleSaveProfile}
              >
                Save
              </button>
            </>
          )}

          <button
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-5 rounded-lg transition"
            onClick={() => {
              window.location.href = "/Carpage";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;





