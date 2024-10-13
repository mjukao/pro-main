import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BathroomDetail from './BathroomDetail';
import Home from './Home';
import Reviews from './Reviews';
import Contact from './Contact'; 
import Nearby from './Nearby';

export default function AppRouter() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bathroom/:id" element={<BathroomDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} /> {/* Route ใหม่ */}
            <Route path="/nearby" element={<Nearby />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
