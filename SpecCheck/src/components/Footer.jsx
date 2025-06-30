import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-navy text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-12 items-start">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SpecCheck</h2>
          <p className="text-sm text-gray-300 mb-4">
            Compare, choose, and buy the best laptop that fits your needs.
          </p>
          <p className="text-xs text-gray-400">&copy; 2025 SpecCheck. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/#shop" className="hover:underline">Shop</a></li>
            <li><a href="/#about" className="hover:underline">About</a></li>
            <li><a href="/#account" className="hover:underline">My Account</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white text-navy rounded-full hover:bg-gray-200 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-white text-navy rounded-full hover:bg-gray-200 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-white text-navy rounded-full hover:bg-gray-200 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-white text-navy rounded-full hover:bg-gray-200 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
