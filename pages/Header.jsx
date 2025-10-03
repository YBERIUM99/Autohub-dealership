import React, { useState, useContext } from "react";
import { User, DollarSign, LogOut } from "lucide-react";
import { authContext } from "../src/contexts/Authcontext";

const Header = ({ onSearch, onFilter }) => {
  const { user, logout } = useContext(authContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRedirect = (path) => {
    window.location.href = path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 h-16 flex items-center">
      <div className="w-full flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <div className="flex items-center h-full gap-2 relative">
          <img
            src="/logopic.png"
            alt="AutoHub Dealer Logo"
            className="h-42 w-42 object-contain"
          />
        </div>

        {/* ---- MIDDLE NAVIGATION ---- */}
        <div className="hidden md:flex items-center gap-10 h-full max-[800px]:hidden">
          {/* Be a Seller */}
          <div className="relative group">
            <button className="text-gray-700 font-semibold text-lg hover:text-blue-600 border-b-2 border-transparent group-hover:border-blue-600 transition">
              Be a Seller
            </button>
            <div className="absolute left-0 top-full mt-2 bg-white shadow-xl border rounded-lg p-4 grid grid-cols-3 gap-4 w-[600px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                onClick={() => handleRedirect("/SellACar")}
              >
                <img
                  src="https://blog.autochek.africa/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-14-at-10.03.02-AM-1-1-1024x683.jpeg"
                  alt="Sell Car"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Sell Your Car</h3>
                  <p className="text-sm text-gray-500">
                    List and reach buyers fast
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHydPMFUJjeLaLMh_LyOtVK-dIHj0wVTKz1A&s"
                  alt="Dealer"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Become a Dealer</h3>
                  <p className="text-sm text-gray-500">
                    Upgrade to dealer account
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86WD6nliYpS9t201SR4XMUl38j8rnnEaJqA&s"
                  alt="Advertise"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Run Ads</h3>
                  <p className="text-sm text-gray-500">
                    Boost your visibility
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buy a Car */}
          <div className="relative group">
            <button className="text-gray-700 font-semibold text-lg hover:text-blue-600 border-b-2 border-transparent group-hover:border-blue-600 transition">
              Buy a Car
            </button>
            <div className="absolute left-0 top-full mt-2 bg-white shadow-xl border rounded-lg p-4 grid grid-cols-3 gap-4 w-[600px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbXN74-zu9pd1L43G7HSWVkAdCdI8kyAfG0Q&s"
                  alt="SUVs"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">SUVs</h3>
                  <p className="text-sm text-gray-500">Comfort & space</p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHx1jpyR7QnRWitv2rWzVD-g86tDAB57M62g&s"
                  alt="Sedans"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Sedans</h3>
                  <p className="text-sm text-gray-500">Luxury and efficiency</p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk86Ld85_uGeRkzfce49Jslzv7n3iVSSuHg&s"
                  alt="Trucks"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Trucks</h3>
                  <p className="text-sm text-gray-500">Power & durability</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Us */}
          <div className="relative group">
            <button className="text-gray-700 font-semibold text-lg hover:text-blue-600 border-b-2 border-transparent group-hover:border-blue-600 transition">
              About Us
            </button>
            <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border rounded-lg p-4 grid grid-cols-3 gap-4 w-[600px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPbddT1zwMp82PEPxf_2XdeUuHhqC1j0_rlg&s"
                  alt="Our Story"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Our Story</h3>
                  <p className="text-sm text-gray-500">
                    Learn about our journey
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://www.shutterstock.com/image-vector/why-choose-us-symbol-text-260nw-2396164945.jpg"
                  alt="Why Choose Us"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Why Choose Us</h3>
                  <p className="text-sm text-gray-500">Trusted by thousands</p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Aj4kRAqMe6AmgiNzSkDBwSbQq6DJ_0gdtw&s"
                  alt="Contact"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold">Contact</h3>
                  <p className="text-sm text-gray-500">We’re here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div
          className="relative flex items-center h-full justify-end min-w-[160px]"
          style={{
            border: "1px solid grey",
            padding: "0 26px",
            borderRadius: "8px",
            height: "50px",
            width: "45px",
          }}
        >
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={
                user?.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{user?.firstName || "Guest"}</span>
          </div>

          {dropdownOpen && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => handleRedirect("/Profile")}
              >
                <User size={16} /> Profile
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => handleRedirect("/SellACar")}
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








