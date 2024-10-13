import React, { useEffect, useState } from 'react';
import { bathroomsData } from './bathroomsData'; // นำเข้าข้อมูลห้องน้ำ
import { Link } from 'react-router-dom'; // สำหรับการเชื่อมไปยังรายละเอียดห้องน้ำ
import { FaMapMarkerAlt, FaStar, FaSearch } from 'react-icons/fa'; // ใช้ไอคอนจาก react-icons

export default function Nearby() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyBathrooms, setNearbyBathrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [sortOption, setSortOption] = useState('distance');
  const [distanceUnit, setDistanceUnit] = useState('km'); // Default unit is kilometers

  // ฟังก์ชันสำหรับหาพิกัดผู้ใช้
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error retrieving location: ", error);
        }
      );
    }
  }, []);

  // ฟังก์ชันคำนวณระยะทางระหว่างพิกัดสองจุด (สูตร Haversine)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = distanceUnit === 'km' ? 6371 : 3958.8; // Use different radius for km or miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // ระยะทางเป็นกิโลเมตรหรือไมล์ตามที่ผู้ใช้เลือก
  };

  // ค้นหาห้องน้ำที่ใกล้ที่สุดเมื่อพิกัดผู้ใช้ถูกตั้งค่า
  useEffect(() => {
    if (userLocation) {
      const sortedBathrooms = bathroomsData
        .filter(bathroom => bathroom.rating >= filterRating) // Filter by rating
        .filter(bathroom => bathroom.name.toLowerCase().includes(searchTerm.toLowerCase()) || bathroom.location.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
        .map((bathroom) => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            bathroom.latitude,
            bathroom.longitude
          );
          return { ...bathroom, distance };
        })
        .sort((a, b) => sortOption === 'distance' ? a.distance - b.distance : b.rating - a.rating); // Sort by distance or rating

      setNearbyBathrooms(sortedBathrooms);
    }
  }, [userLocation, searchTerm, filterRating, sortOption, distanceUnit]);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-white tracking-wide">
        ห้องน้ำใกล้ตัว
      </h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="ค้นหาห้องน้ำ..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute top-3 right-3 text-gray-400" />
          </div>

          {/* Filter by Rating */}
          <select 
            value={filterRating} 
            onChange={(e) => setFilterRating(Number(e.target.value))} 
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value={0}>แสดงทุกคะแนน</option>
            <option value={4}>4 ดาวขึ้นไป</option>
            <option value={4.5}>4.5 ดาวขึ้นไป</option>
          </select>
        </div>

        {/* Sort by Option */}
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)} 
          className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="distance">เรียงตามระยะทาง</option>
          <option value="rating">เรียงตามคะแนน</option>
        </select>

        {/* Distance Unit Toggle */}
        <select 
          value={distanceUnit} 
          onChange={(e) => setDistanceUnit(e.target.value)} 
          className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="km">กิโลเมตร (km)</option>
          <option value="miles">ไมล์ (miles)</option>
        </select>
      </div>

      {userLocation ? (
        <div className="flex flex-wrap justify-center gap-8">
          {nearbyBathrooms.slice(0, 5).map((bathroom) => ( // แสดงแค่ 5 ที่ใกล้ที่สุด
            <div key={bathroom.id} className="bg-gray-900 shadow-2xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 max-w-xs w-full relative">
              
              {/* Image with gradient overlay */}
              <div className="relative">
                <img 
                  src={bathroom.image} 
                  alt={bathroom.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
              </div>
              
              <div className="p-6 flex flex-col justify-between h-64">
                <div>
                  {/* Bathroom Name */}
                  <h2 className="text-2xl font-semibold mb-2 text-white line-clamp-2">
                    {bathroom.name}
                  </h2>
                  
                  {/* Rating */}
                  <div className="flex items-center text-yellow-400 mb-3">
                    <FaStar className="mr-1" />
                    <span className="text-gray-300 font-medium">{bathroom.rating} ดาว</span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center text-gray-400 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="line-clamp-1">{bathroom.location}</span>
                  </div>
                </div>
                
                {/* Distance and Button */}
                <div>
                  <div className="text-gray-400 mb-3">
                    ระยะทาง: <span className="font-semibold text-gray-300">{bathroom.distance.toFixed(2)} {distanceUnit}</span>
                  </div>
                  <Link 
                    to={`/bathroom/${bathroom.id}`} 
                    className="block mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-center rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xl">กำลังค้นหาตำแหน่งของคุณ...</p>
      )}
    </div>
  );
}
