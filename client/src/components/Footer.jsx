import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-gray-300 mt-20 pt-12 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg text-white mb-4">Contact</h3>
          <p className="text-sm mb-2 hover:text-white transition-colors cursor-pointer">+66 12 345 6789</p>
          <p className="text-sm hover:text-white transition-colors cursor-pointer">contact@carrental.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg text-white mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg text-white mb-4">Social</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="md:col-span-1 flex items-end">
          <p className="text-sm text-gray-400">&copy; 2025 Car Rental. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

