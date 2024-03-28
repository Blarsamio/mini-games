// ReturnHomeButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";



const ReturnHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-16 left-16 bg-transparent text-gray-700 hover:text-gray-900"
      aria-label="Return to Home"
    >
      {/* Example using an SVG home icon */}
      <FaArrowLeft className="w-8 h-8" />
    </button>
  );
};

export default ReturnHomeButton;
