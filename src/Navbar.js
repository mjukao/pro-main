import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="text-gray-600 hover:text-blue-500">หน้าหลัก</Link>
        <Link to="/nearby" className="text-gray-600 hover:text-blue-500">ใกล้ตัว</Link>
        <Link to="/reviews" className="text-gray-600 hover:text-blue-500">รีวิว</Link>
        <Link to="/contact" className="text-gray-600 hover:text-blue-500">ติดต่อเรา</Link>
        


      </div>
    </nav>
  );
}

export default Navbar;
