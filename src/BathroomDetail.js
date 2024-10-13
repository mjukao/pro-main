import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bathroomsData } from './bathroomsData';
import Navbar from './Navbar';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaFacebook, FaTwitter, FaInstagram, FaStar } from "react-icons/fa";

const BathroomDetail = () => {
  const { id } = useParams();
  const bathroom = bathroomsData.find(b => b.id === parseInt(id));

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewsList, setReviewsList] = useState([]);

  if (!bathroom) {
    return <p>ไม่พบห้องน้ำที่คุณต้องการดู</p>;
  }

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "20px"
  };

  const center = {
    lat: bathroom.latitude,
    lng: bathroom.longitude,
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim() && rating) {
      const newReview = { review, rating };
      setReviewsList([...reviewsList, newReview]);
      setReview('');
      setRating(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 bg-white shadow flex items-center justify-between">
        <img src="https://your-logo-url.com/logo.png" alt="Logo" className="h-10" />
        <h1 className="text-3xl font-bold text-center flex-grow">โคตรปวดขี้.com</h1>
      </header>

      <Navbar />

      <div className="flex-grow flex justify-center items-center p-8">
        <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">{bathroom.name}</h2>
          <img src={bathroom.image} alt={bathroom.name} className="w-full h-60 object-cover rounded-lg my-4" />
          <p><strong>สถานที่:</strong> {bathroom.location}</p>
          <p><strong>ความสะอาด:</strong> {bathroom.cleanliness}</p>
          <p><strong>คะแนน:</strong> {bathroom.rating}</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">กลับไปยังรายการห้องน้ำ</Link>

          {/* แผนที่ */}
          <LoadScript googleMapsApiKey="YOUR_ACTUAL_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>

          {/* ช่องรีวิวและการให้คะแนน */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">เพิ่มรีวิว</h3>
            <form onSubmit={handleReviewSubmit} className="mt-4">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar 
                      key={star}
                      className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{rating} ดาว</span>
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="เขียนรีวิว..."
                className="mt-2 w-full p-2 border rounded-lg"
                rows="4"
              />
              <button type="submit" className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2">ส่งรีวิว</button>
            </form>
            {/* แสดงรีวิว */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold">รีวิวที่ส่งแล้ว:</h4>
              <ul className="list-disc list-inside">
                {reviewsList.map((item, index) => (
                  <li key={index} className="mt-2">
                    <span className="font-bold">{item.rating} ดาว:</span> {item.review}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p className="text-sm mb-4">ติดตามเราได้ที่</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
          <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
        </div>
        <p className="text-sm mt-4">&copy; 2024 โคตรปวดขี้.com. สงวนลิขสิทธิ์.</p>
      </footer>
    </div>
  );
};

export default BathroomDetail;
