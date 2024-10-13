import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaSpinner } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha'; // สำหรับ reCAPTCHA

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false); // เก็บสถานะ reCAPTCHA
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error('กรุณายืนยันว่าคุณไม่ใช่บอท');
      return;
    }
    setLoading(true);

    // จำลองการส่งข้อมูล (เชื่อม API จริงได้ที่นี่)
    setTimeout(() => {
      console.log('ส่งข้อมูล:', formData);
      toast.success('ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อเรา');
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleCaptcha = (value) => {
    setCaptchaVerified(true); // เมื่อผ่านการยืนยัน reCAPTCHA
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-300">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container mx-auto p-8 max-w-3xl mt-10">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">ติดต่อเรา</h1>
        
        <nav className="text-sm mb-6 text-center">
          <span className="text-gray-500">หน้าหลัก</span> &gt; <span className="text-blue-600">ติดต่อเรา</span>
        </nav>

        <p className="text-center text-gray-600 mb-8">
          มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ติดต่อเราผ่านฟอร์มนี้หรือที่ข้อมูลด้านล่าง
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              ชื่อของคุณ
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="กรอกชื่อของคุณ"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              อีเมลของคุณ
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="กรอกอีเมลของคุณ"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
              ข้อความของคุณ
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="เขียนข้อความของคุณที่นี่"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 h-40 resize-none"
            />
          </div>

          <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptcha} />


          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading || !captchaVerified}
              className={`w-full py-3 px-6 rounded-lg text-white font-bold ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'ส่งข้อความ'}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center space-y-4">
          <h2 className="text-2xl font-semibold">ข้อมูลติดต่อเพิ่มเติม</h2>
          <p className="text-gray-700 flex items-center justify-center space-x-2">
            <FaPhone className="text-blue-500" /> <span>โทร: 02-123-4567</span>
          </p>
          <p className="text-gray-700 flex items-center justify-center space-x-2">
            <FaEnvelope className="text-blue-500" /> <span>อีเมล: support@example.com</span>
          </p>
          

          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
              <FaFacebook size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
              <FaInstagram size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
              <FaTwitter size={28} />
            </a>
          </div>
        </div>

        <div className="mt-10">
          <iframe
            title="map"
            className="w-full h-64 rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.3153738112884!2d99.00161177574175!3d18.890509726134024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da2f58a96e7e79%3A0x9a84e3f4c0c0ef9a!2z4Lia4Lij4Liw4Lih4Li04LiX4LiB4Lip4Lix4LiXIOC4peC4reC4quC4meC4reC5jCDguKrguLTguYDguJnguLTguYwg4Lia4Lij4Li04LiZ4LiE4Li24LiZ4LmA!5e0!3m2!1sth!2sth!4v1697194795674!5m2!1sth!2sth"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
