import React from 'react';

const Hero = () => {
  // We use an inline style here to dynamically set the background image.
  // This makes it easy to change the image URL from a variable or prop later.
  const heroStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
      <header className="relative h-[500px] md:h-[600px]" style={heroStyle}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Easy Car Rental, <br /> Affordable Prices
          </h1>
          <p className="text-lg text-gray-200 mt-4 max-w-lg mx-auto md:mx-0">
            Safe and reliable car rentals for every journey
          </p>
        </div>
      </header>

      {/* Search Form that sits on top of the next section */}
      <div className="container mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4">
          <select className="flex-1 w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option>Select a car</option>
            <option>Toyota Camry</option>
            <option>Honda Civic</option>
            <option>BMW 3 Series</option>
          </select>
          <input type="date" className="flex-1 w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <input type="date" className="flex-1 w-full p-3 border border-gray-200 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <input type="text" placeholder="Location" className="flex-1 w-full p-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <button className="w-full md:w-auto bg-[#E6B325] text-[#2C3E50] font-bold py-3 px-8 rounded-md hover:bg-yellow-500 transition-colors">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;

