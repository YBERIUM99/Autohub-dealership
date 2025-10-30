// src/pages/SingleCar.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SingleCar = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch single car by id
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`https://autohub-dealership-backend.onrender.com/api/products/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

 if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div
        role="status"
        aria-busy="true"
        className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8 animate-pulse"
      >
        {/* Top area: image + details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image skeleton */}
          <div className="flex-shrink-0 w-full md:w-2/5 h-56 md:h-96 rounded-lg bg-gray-200 overflow-hidden">
            {/* subtle gradient shimmer */}
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>

          {/* Details skeleton */}
          <div className="flex-1 space-y-4 py-1">
            <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-5 w-1/3 bg-gray-200 rounded-md" />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-28 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* action buttons skeleton */}
            <div className="flex gap-3 mt-6">
              <div className="h-10 w-40 rounded-lg bg-gray-200" />
              <div className="h-10 w-28 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Seller panel skeleton (bottom) */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-col gap-2 items-end">
              <div className="h-8 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* spinner + message */}
        <div className="mt-6 flex items-center justify-center gap-3 opacity-90">
          <svg
            className="animate-spin h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-gray-600 text-sm md:text-base">Loading car details…</span>
        </div>
      </div>
    </div>
  );
}

  if (!car) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">Car not found</h2>
      </div>
    );
  }

  const nextImage = () => {
    if (currentImage < car.image.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Car Image carousel*/}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
        {car.image && car.image.length > 0 ? (
          <img
            src={car.image[currentImage]}
            alt={car.name}
            className="w-full h-[220px] sm:h-[300px] md:h-[400px] max-h-[60vw] object-cover transition-all duration-200"
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-200">
            <span className="text-gray-600">No Image Available</span>
          </div>
        )}

        {/* Left Arro */}
        {currentImage > 0 && (
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arro */}
        {car.image && currentImage < car.image.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Car Details */}
      <div className="p-6 bg-gray-50 mt-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold mb-2">{car.name}</h2>
          <p className="text-4xl font-extrabold text-blue-600">
            ${car.price?.toLocaleString()}
          </p>
        </div>

        <p className="text-gray-600 mt-4">{car.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-800 mt-6">
          <p>
            <span className="font-semibold">Year:</span> {car.year}
          </p>
          <p>
            <span className="font-semibold">Engine:</span> {car.engine}
          </p>
          <p>
            <span className="font-semibold">Fuel Type:</span> {car.fuel}
          </p>
          <p>
            <span className="font-semibold">Transmission:</span> {car.transmission}
          </p>
          <p>
            <span className="font-semibold">Mileage:</span>{" "}
            {car.mileage?.toLocaleString()} km
          </p>
          {car.color && (
            <p>
              <span className="font-semibold">Color:</span> {car.color}
            </p>
          )}
        </div>
      </div>

      {/* Seller Info */}
      <div className="bg-white mt-10 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold mb-4">Seller Information</h3>
        <div className="flex items-center gap-4">
          {car.sellerImage ? (
            <img
              src={car.sellerImage}
              alt={car.sellerName || "Seller"}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
              {car.sellerName ? car.sellerName.charAt(0) : "?"}
            </div>
          )}
          <div>
            <p className="text-lg font-bold">{car.sellerName}</p>
            {/*  */}
            {car.sellerPhone && <p className="text-gray-600">{car.sellerPhone}</p>}
            {car.sellerEmail && <p className="text-gray-600">{car.sellerEmail}</p>}
            {car.sellerLocation && <p className="text-gray-600">{car.sellerLocation}</p>}
            {/* */}

          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/Carpage")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          ← Back to Cars
        </button>
      </div>
    </div>
  );
};

export default SingleCar;









