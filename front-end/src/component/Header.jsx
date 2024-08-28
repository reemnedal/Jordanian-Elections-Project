// src/components/Header.jsx
import React from 'react';
import videoSource from '../Media/vid.mp4'; // Adjust the path to your video file

const Header = () => {
  return (
    <header className="relative h-[80vh] md:h-[70vh] lg:h-[92vh] overflow-hidden">
      {/* Background Video */}
      <video
        src={videoSource}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover "
      ></video>

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl font-bold mb-4">
            الانتخابات الأردنية
          </h1>
          <p className="text-lg">
            أهلاً وسهلاً بكم في تطبيق الخاص بالانتخابات
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
