
import React, { useState } from 'react';

const AddBathroomPopup = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBathroom = {
      id: Date.now(), // สร้าง ID ใหม่
      name,
      location,
      cleanliness,
      rating,
      image,
    };
    onAdd(newBathroom);
    onClose(); // ปิด Popup หลังจากเพิ่มรายการ
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">เพิ่มห้องน้ำใหม่</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อห้องน้ำ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="สถานที่"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="URL ของภาพ"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">เพิ่ม</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2">ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBathroomPopup;
