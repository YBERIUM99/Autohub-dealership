// src/pages/SingleCar.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SingleCar = () => {
  const { id } = useParams(); // MongoDB _id will come here
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
    return <div className="text-center py-20">Loading...</div>;
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
      {/* Car Image with carousel */}
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

        {/* Left Arrow */}
        {currentImage > 0 && (
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow */}
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
            {/* Optional fields in case you extend schema later */}
            {car.sellerPhone && <p className="text-gray-600">{car.sellerPhone}</p>}
            {car.sellerEmail && <p className="text-gray-600">{car.sellerEmail}</p>}
            {car.sellerLocation && <p className="text-gray-600">{car.sellerLocation}</p>}
            {/* No need to show the image URL as text */}

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









