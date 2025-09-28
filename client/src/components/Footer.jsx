import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-[#2C3E50] text-gray-300 mt-20 pt-12 pb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold text-lg text-white mb-4">Contact</h3>
          <motion.p 
            className="text-sm mb-2 hover:text-white transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            +66 12 345 6789
          </motion.p>
          <motion.p 
            className="text-sm hover:text-white transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            contact@carrental.com
          </motion.p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold text-lg text-white mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
              </motion.div>
            </li>
            <li className="mb-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
              </motion.div>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold text-lg text-white mb-4">Social</h3>
          <div className="flex space-x-4">
            <motion.a 
              href="#" 
              className="text-sm hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Facebook
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Instagram
            </motion.a>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="md:col-span-1 flex items-end"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400">&copy; 2025 Car Rental. All rights reserved.</p>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export default Footer;

