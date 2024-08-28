import React from "react";
import { Link } from "react-router-dom";

// Import the image
import fullWidthImage from "../Media/jordanvote.png"; // Adjust the path as needed

const Pic = () => {
  return (
    <div className="relative w-full h-100 pt-28 pb-28">
      {/* Full-width Image */}
      <img
        src={fullWidthImage}
        alt="Full Width"
        className="w-full h-full object-cover"
      />

      {/* Transparent Button Overlay */}
      <Link
        to="/Voting"
        className="absolute flex items-center justify-center top-1/2 transform -translate-y-1/2 md:right-16 right-4"
      >
        <button className="bg-gray-800 border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-white hover:text-black transition-colors duration-300">
          !صوت الأن
        </button>
      </Link>
    </div>
  );
};

export default Pic;
