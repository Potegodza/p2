import React from "react";
import Hero from "../components/home/Hero";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    // We add spacing between major sections for a clean look
    <div className="space-y-20">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Our Cars Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-brand-dark mb-8 text-center md:text-left">
          Our Cars
        </h2>
        
        {/* We can reuse the existing components for best sellers and new products */}
        <div>
          <h3 className="text-2xl font-semibold text-brand-dark my-4">Best Sellers</h3>
          <BestSeller />
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-brand-dark my-4">New Arrivals</h3>
          <NewProduct />
        </div>
      </section>

       {/* 3. Promotion Section */}
      <section className="container mx-auto px-6">
        <div className="bg-gray-200/80 rounded-lg p-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <h2 className="text-3xl font-bold text-brand-dark mb-4 md:mb-0">Promotion</h2>
            <p className="text-2xl font-semibold text-brand-dark">
                Rent 3 Days, <span className="text-red-600">Get 1 Day Free</span>
            </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

