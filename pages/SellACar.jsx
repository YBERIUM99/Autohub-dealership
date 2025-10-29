// src/pages/SellACar.jsx
import React, { useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authContext } from "../src/contexts/Authcontext";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  price: yup.number().typeError("Price must be a number").required("Price is required"),
  year: yup.number().typeError("Year must be a number").required("Year is required"),
  transmission: yup.string().required("Transmission is required"),
  fuel: yup.string().required("Fuel is required"),
  mileage: yup.number().typeError("Mileage must be a number").required("Mileage is required"),
  color: yup.string().nullable(),
  engine: yup.string().required("Engine is required"),
  description: yup.string().nullable(),
  sellerPhone: yup.string().nullable(),
  sellerEmail: yup.string().email("Invalid email").nullable(),
  sellerLocation: yup.string().nullable(),
});

const SellACar = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const baseUrl = "https://autohub-dealership-backend.onrender.com";

  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const urlInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...imageFiles, ...files].slice(0, 8);
    setImageFiles(newFiles);
    setPreviewUrls(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const removeFile = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setPreviewUrls(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const handleAddUrl = () => {
    const val = urlInputRef.current.value?.trim();
    if (!val) return;
    setImageUrls((prev) => [...prev, val].slice(0, 8));
    urlInputRef.current.value = "";
  };

  const removeImageUrl = (i) => setImageUrls((s) => s.filter((_, idx) => idx !== i));

  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "Autohub1");

    const res = await fetch("https://api.cloudinary.com/v1_1/dvjis8d3y/image/upload", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    if (!data.secure_url) throw new Error("Cloudinary upload failed");
    return data.secure_url;
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      let uploadedUrls = [];
      if (imageFiles.length) {
        uploadedUrls = await Promise.all(imageFiles.map((f) => uploadToCloudinary(f)));
      }

      const allImages = [...imageUrls, ...uploadedUrls];

      const payload = {
        name: formData.name,
        price: Number(formData.price),
        year: Number(formData.year),
        transmission: formData.transmission,
        fuel: formData.fuel,
        mileage: Number(formData.mileage),
        color: formData.color || "",
        engine: formData.engine,
        description: formData.description || "",
        image: allImages,
        sellerName: user?.firstName ? `${user.firstName} ${user.lastName}` : "Guest",
        sellerPhone: formData.sellerPhone || "",
        sellerEmail: formData.sellerEmail || "",
        sellerLocation: formData.sellerLocation || "",
        sellerImage: user?.profilePicture || "",
      };

      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create car");

      alert("Car listed successfully ✅");
      navigate("/Carpage");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error creating car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <button
          type="button"
          onClick={() => navigate("/Carpage")}
          className="flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
        >
          ← Back to Cars
        </button>

        <h2 className="text-2xl font-bold mb-4">Sell a Car</h2>

        <div className="mb-4 text-sm text-gray-600">
          Selling as: <span className="font-medium">{user?.firstName || ""} {user?.lastName || user?.email || "Guest"}</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/*  */}
          {/* Name, Price, Year, Mileage, Transmission, Fuel, Color, Engine, Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input {...register("name")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" {...register("price")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input type="number" {...register("year")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mileage</label>
              <input type="number" {...register("mileage")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Transmission</label>
              <input {...register("transmission")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.transmission && <p className="text-red-500 text-sm">{errors.transmission.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fuel</label>
              <input {...register("fuel")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.fuel && <p className="text-red-500 text-sm">{errors.fuel.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Color (optional)</label>
              <input {...register("color")} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="e.g. Black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Engine</label>
              <input {...register("engine")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              {errors.engine && <p className="text-red-500 text-sm">{errors.engine.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <input {...register("description")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
          </div>

          {/* Seller info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Phone (optional)</label>
              <input {...register("sellerPhone")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Email (optional)</label>
              <input type="email" {...register("sellerEmail")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Seller Location (optional)</label>
            <input {...register("sellerLocation")} className="mt-1 w-full px-3 py-2 border rounded-lg" />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos (files)</label>
            <input style={{backgroundColor:"#3B82F6", borderRadius:"20px"}} type="file" accept="image/*" multiple onChange={handleFilesChange} className="w-full"/>
            <p className="text-xs text-gray-500 mt-1">You can add files or paste URLs below.</p>
            {previewUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {previewUrls.map((src, i) => (
                  <div key={i} className="relative rounded overflow-hidden border">
                    <img src={src} alt={`preview-${i}`} className="w-full h-24 object-cover" />
                    <button type="button" onClick={() => removeFile(i)} className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <div className="flex gap-2">
            </div>
            {imageUrls.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {imageUrls.map((u, i) => (
                  <div key={i} className="px-2 py-1 bg-gray-100 rounded flex items-center gap-2">
                    <span className="text-xs">{u.length > 30 ? u.slice(0, 30) + "…" : u}</span>
                    <button type="button" onClick={() => removeImageUrl(i)} className="text-red-500 text-sm">x</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              {loading ? "Listing car..." : "List Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellACar;



