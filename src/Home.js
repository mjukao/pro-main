import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaShower,
  FaStar,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { bathroomsData } from "./bathroomsData";
import Navbar from "./Navbar";
import AddBathroomPopup from "./AddBathroomPopup";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBathrooms, setFilteredBathrooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleAddBathroom = (newBathroom) => {
    bathroomsData.push(newBathroom);
    handleSearch();
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredBathrooms([]);
      return;
    }

    const filtered = bathroomsData.filter(
      (bathroom) =>
        bathroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bathroom.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bathroom.cleanliness.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBathrooms(filtered);
  };

  // ใช้ useEffect เพื่ออัพเดท filteredBathrooms เมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  // Pagination Logic
  const totalItems =
    filteredBathrooms.length > 0
      ? filteredBathrooms.length
      : bathroomsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems =
    (searchTerm === "" ? bathroomsData : filteredBathrooms) || [];
  const displayItems = currentItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ป้องกันการเข้าถึง length ของ undefined
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 bg-white shadow flex flex-col items-center">
        <img
          src="https://your-logo-url.com/logo.png"
          alt="Logo"
          className="h-10"
        />
        <h1 className="text-3xl font-bold text-center mt-2">โคตรปวดขี้.com</h1>
        <div className="flex justify-center mt-4 w-full max-w-xl">
          {/* ...โค้ดสำหรับช่องค้นหา */}
        </div>
      </header>
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
          <main>
            {displayItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayItems.map((bathroom) => (
                  <div
                    key={bathroom.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
                  >
                    <img
                      src={bathroom.image}
                      alt={bathroom.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="text-xl font-semibold mt-4">
                      {bathroom.name}
                    </h2>
                    <p className="mt-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-600" />{" "}
                      {bathroom.location}
                    </p>
                    <p className="mt-2 flex items-center">
                      <FaShower className="mr-2 text-gray-600" />{" "}
                      {bathroom.cleanliness}
                    </p>
                    <div className="mt-2 flex items-center">
                      <FaStar className="mr-2 text-yellow-500" />{" "}
                      {bathroom.rating}
                    </div>
                    <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg absolute bottom-4 right-4">
                      <Link to={`/bathroom/${bathroom.id}`}>ดูข้อมูล</Link>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">ไม่พบห้องน้ำที่ค้นหา</p>
            )}
          </main>

          {/* Pagination for Bathrooms */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </span>{" "}
                  of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        index + 1 === currentPage
                          ? "bg-indigo-600 text-white"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    disabled={currentPage === totalPages}
                  >
                    {/* Popup สำหรับเพิ่มห้องน้ำ */}
                    <AddBathroomPopup
                      isOpen={isPopupOpen}
                      onClose={() => setPopupOpen(false)}
                      onAdd={handleAddBathroom}
                    />

                    {/* ปุ่มเพิ่มห้องน้ำที่มุมขวาล่าง */}
                    <button
                      onClick={() => setPopupOpen(true)}
                      className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
                    >
                      เพิ่มห้องน้ำ
                    </button>
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p className="text-sm mb-4">ติดตามเราได้ที่</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-400">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagram />
          </a>
        </div>
        <p className="text-sm mt-4">
          &copy; 2024 โคตรปวดขี้.com. สงวนลิขสิทธิ์.
        </p>
      </footer>
    </div>
  );
}
