import React, { useState, useContext } from "react";
import { Search, User, DollarSign, LogOut, Filter } from "lucide-react";
import { authContext } from "../src/contexts/Authcontext";

const Header = ({ onSearch, onFilter }) => {
  const { user, logout } = useContext(authContext);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 h-16 flex items-center">
      <div className="w-full flex items-center justify-between px-6 h-full">
        {/* Logo + Filter */}
        <div className="flex items-center h-full gap-2 relative">
          <img src="/logopic.png" alt="AutoHub Dealer Logo" className="h-42 w-42 object-contain" />
          {/* <button
            className="flex items-center justify-center h-8 px-2 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300 ml-2 gap-1"
            onClick={() => setFilterOpen((prev) => !prev)}
            title="Filter"
          >
            <Filter size={16} className="text-gray-600" />
            <span className="text-xs text-gray-700 font-medium">Filter</span>
          </button> */}
          {filterOpen && (
            <div className="absolute left-0 top-12 bg-white border rounded-lg shadow-lg p-4 z-50 min-w-[220px]">
              <div className="mb-2">
                <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md text-sm"
                  min={0}
                  placeholder="0"
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md text-sm"
                  min={0}
                  placeholder="100000"
                />
              </div>
              <div className="flex gap-2 mt-3 justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                  onClick={() => {
                    setFilterOpen(false);
                    if (onFilter) onFilter({ min: minPrice, max: maxPrice });
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm font-medium"
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                    setFilterOpen(false);
                    if (onFilter) onFilter({ min: "", max: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div> */}

        {/* Profile */}
        <div className="relative flex items-center h-full justify-end min-w-[160px]" style={{border: '1px solid grey', padding: '0 26px', borderRadius: '8px' , height: '50px' , width: '45px'}}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{user?.firstName || "Guest"}</span>
          </div>

          {dropdownOpen && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => { window.location.href = '/Profile'; }}
              >
                <User size={16} /> Profile
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => { window.location.href = '/SellACar'; }}
              >
                <DollarSign size={16} /> Sell a Car
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;



