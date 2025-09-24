// src/pages/Carpage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Filter } from "lucide-react";

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const carName = car?.name ? car.name.toLowerCase() : "";
    const carYear = car?.year ? car.year.toString() : "";
    const matchesSearch =
      carName.includes(searchTerm.toLowerCase()) ||
      carYear.includes(searchTerm.toLowerCase());

    const cleanPrice = Number(car.price);
    const min =
      priceFilter.min !== "" ? Number(priceFilter.min.replace(/[^\d.]/g, "")) : null;
    const max =
      priceFilter.max !== "" ? Number(priceFilter.max.replace(/[^\d.]/g, "")) : null;
    let matchesPrice = true;

    if (!isNaN(cleanPrice)) {
      if (min !== null && max !== null) matchesPrice = cleanPrice >= min && cleanPrice <= max;
      else if (min !== null) matchesPrice = cleanPrice >= min;
      else if (max !== null) matchesPrice = cleanPrice <= max;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <>
      <Header onSearch={setSearchTerm} onFilter={setPriceFilter} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Banner */}
        <div className="w-[95%] mx-auto mb-8 rounded-xl overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
          <div
            className="relative z-20 flex flex-col items-center justify-center h-full px-4"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/premium-photo/suv-buggy-hummer-concept-car_551707-73934.jpg?semt=ais_hybrid&w=740&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
            }}
          >
            <h1 className="text-white text-4xl font-bold mb-4 text-center">
              Find Your Dream Car
            </h1>
            <p className="text-white text-lg text-center mb-6">
              Browse our collection of the best cars available
            </p>

            {/* Search + Filter */}
            <div className="w-[90%] bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative overflow-visible transition-all duration-200">
              {/* Filter Button */}
              <div className="relative w-full sm:w-auto">
                <button
                  className="flex items-center gap-1 w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setShowFilter((prev) => !prev)}
                >
                  <Filter size={16} /> <span className="hidden xs:inline">Filter</span>
                </button>
                {/* Filter Dropup */}
                {showFilter && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-60 sm:w-64 z-[9999] animate-fadeInUp">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-500">Min Price</label>
                      <input
                        type="number"
                        value={priceFilter.min}
                        onChange={(e) =>
                          setPriceFilter({ ...priceFilter, min: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-2 py-1"
                      />
                      <label className="text-sm text-gray-500">Max Price</label>
                      <input
                        type="number"
                        value={priceFilter.max}
                        onChange={(e) =>
                          setPriceFilter({ ...priceFilter, max: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-2 py-1"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                          onClick={() => {
                            setPriceFilter({ min: "", max: "" });
                            setShowFilter(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => setShowFilter(false)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search by name or year..."
                className="flex-1 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading cars...</p>
        ) : (
         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <Link
                  key={car._id}
                  to={`/car/${car._id}`}
                  className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
                >
                  <img
  src={
    Array.isArray(car.image) && car.image.length > 0
      ? car.image[0]
      : "https://via.placeholder.com/400x300?text=No+Image"
  }
  alt={car.name || "Car"}
  className="w-60 h-30  bg-gray-100"
/>
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{car.name || "Unknown Car"}</h2>
                    <p className="text-gray-600">{car.year || "N/A"}</p>
                    <p className="text-blue-600 text-lg font-semibold">
                      ${car.price?.toLocaleString() || "Price on request"}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                No cars match your search.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CarPage;










