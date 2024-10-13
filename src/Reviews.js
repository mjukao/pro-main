import React, { useState } from 'react';
import { bathroomsData } from './bathroomsData'; // สมมติว่าคุณมีข้อมูลห้องน้ำใน bathroomsData
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [ratingFilter, setRatingFilter] = useState(''); // สถานะการกรองคะแนน
  const [paymentFilter, setPaymentFilter] = useState(''); // สถานะการกรองการชำระเงิน

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentFilter(e.target.value);
  };

  // ฟังก์ชันสำหรับการกรองข้อมูลตามคะแนน
  const filterBathrooms = () => {
    let filtered = bathroomsData;

    // การกรองตามคะแนน
    if (ratingFilter === '5') {
      filtered = filtered.filter(b => b.rating >= 4.5);
    } else if (ratingFilter === '4') {
      filtered = filtered.filter(b => b.rating >= 3.5 && b.rating < 4.5);
    } else if (ratingFilter === '3') {
      filtered = filtered.filter(b => b.rating >= 2.5 && b.rating < 3.5);
    } else if (ratingFilter === '2') {
      filtered = filtered.filter(b => b.rating < 2.5);
    }

    // การกรองตามการชำระเงิน
    if (paymentFilter === 'free') {
      filtered = filtered.filter(b => b.price === 0);
    } else if (paymentFilter === 'paid') {
      filtered = filtered.filter(b => b.price > 0);
    }

    return filtered; // ส่งกลับข้อมูลที่กรองแล้ว
  };

  const filteredBathrooms = filterBathrooms();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 bg-white shadow flex items-center justify-between">
        <img src="https://your-logo-url.com/logo.png" alt="Logo" className="h-10" />
        <h1 className="text-3xl font-bold text-center flex-grow">รีวิวห้องน้ำ</h1>
      </header>

      <Navbar />

      <div className="flex-grow flex justify-center items-center p-8">
        <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">กรองตามคะแนน</h2>
            <select
              value={ratingFilter}
              onChange={handleRatingChange}
              className="border rounded px-2 py-1"
            >
              <option value="">ทั้งหมด</option>
              <option value="5">ดีมาก (5 ดาว)</option>
              <option value="4">ดี (4 ดาว)</option>
              <option value="3">กลาง (3 ดาว)</option>
              <option value="2">พอใช้ได้ (2 ดาว)</option>
            </select>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">กรองตามค่าใช้จ่าย</h2>
            <select
              value={paymentFilter}
              onChange={handlePaymentChange}
              className="border rounded px-2 py-1"
            >
              <option value="">ทั้งหมด</option>
              <option value="free">ฟรี</option>
              <option value="paid">เสียเงิน</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBathrooms.length > 0 ? (
              filteredBathrooms.map((bathroom) => (
                <div key={bathroom.id} className="bg-gray-50 p-4 rounded-lg shadow-lg relative">
                  <img
                    src={bathroom.image}
                    alt={bathroom.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h2 className="text-xl font-semibold mt-4">{bathroom.name}</h2>
                  <p className="mt-2 flex items-center">
                    <FaStar className="mr-1 text-yellow-500" />
                    {bathroom.rating}
                  </p>
                  <p className="mt-2">{bathroom.cleanliness}</p>
                  <p className="mt-2">
                    {bathroom.price === 0 ? 'ฟรี' : 'เสียเงิน'}
                  </p>
                  <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg absolute bottom-4 right-4">
                    <Link to={`/bathroom/${bathroom.id}`}>ดูข้อมูล</Link>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">ไม่พบห้องน้ำที่ตรงตามเกณฑ์</p>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p className="text-sm mt-4">&copy; 2024 โคตรปวดขี้.com. สงวนลิขสิทธิ์.</p>
      </footer>
    </div>
  );
};

export default Reviews;
