import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Media/logo.png'; // Adjust the path to your logo image

const Footer = () => {
  return (
    <div className="pt-28">
      <footer className="bg-gray-100 text-black p-4 mt-auto shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Home Link */}
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 mr-2" /> {/* Adjust logo size as needed */}
              <span className="text-xl font-bold">الانتخابات الأردنية</span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <Link to="/pages/aboutUs" className="text-black hover:text-blue-800">
              من نحن
            </Link>
            <Link to="/pages/contactUs" className="text-black hover:text-blue-800">
              تواصل معنا
            </Link>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <div>
              <p className="font-semibold">اتصل بنا:</p>
              <p>الهاتف: +962 6 123 4567</p>
              <p>البريد الإلكتروني: info@elections.jo</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center mt-4">
          <p>&copy; 2024 الانتخابات الأردنية. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
