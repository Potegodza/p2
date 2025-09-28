import React from "react";
import Hero from "../components/home/Hero";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";
import { motion } from "framer-motion";

const Home = () => {
  return (
    // We add spacing between major sections for a clean look
    <motion.div 
      className="space-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Our Cars Section */}
      <motion.section 
        className="container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl font-bold text-brand-dark mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Cars
        </motion.h2>
        
        {/* We can reuse the existing components for best sellers and new products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-brand-dark my-4">Best Sellers</h3>
          <BestSeller />
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-brand-dark my-4">New Arrivals</h3>
          <NewProduct />
        </motion.div>
      </motion.section>

       {/* 3. Promotion Section */}
      <motion.section 
        className="container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="bg-gray-200/80 rounded-lg p-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
            <motion.h2 
              className="text-3xl font-bold text-brand-dark mb-4 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Promotion
            </motion.h2>
            <motion.p 
              className="text-2xl font-semibold text-brand-dark"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
                Rent 3 Days, <span className="text-red-600">Get 1 Day Free</span>
            </motion.p>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;

