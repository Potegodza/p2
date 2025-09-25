import React, { useEffect, useState } from "react";
import useCarRentalStore from "../../store/carRentalStore";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // We still need the base styles for the slider
import { numberFormat } from "../../utils/number";
import { toast } from "react-toastify";
import { Search, X } from "lucide-react";

const SearchCard = () => {
  const getCar = useCarRentalStore((state) => state.getCar);
  const actionSearchFilters = useCarRentalStore((state) => state.actionSearchFilters);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState([0, 10000]);

  // This useEffect will trigger a search with a short delay after the user stops typing or sliding.
  useEffect(() => {
    const handler = setTimeout(() => {
      // We send the latest values to the search action
      actionSearchFilters({ brand, price });
    }, 500); // 0.5 second delay

    // Cleanup function to clear the timeout on every re-render
    return () => clearTimeout(handler);
  }, [brand, price, actionSearchFilters]);

  const handleClearFilters = () => {
    setBrand("");
    setPrice([0, 10000]);
    getCar(); // Call getCar to reset to the initial list
    toast.info("Filters cleared");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
        <Search size={24} />
        Find Your Car
      </h2>
      
      {/* Brand Search Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">Brand</label>
        <input
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          type="text"
          placeholder="e.g., Toyota, Honda"
          className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
        />
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">Price Range (per day)</label>
        <div className="px-1">
          <Slider
            onChange={setPrice}
            range
            min={0}
            max={10000}
            defaultValue={[0, 10000]}
            value={price}
            trackStyle={[{ backgroundColor: '#E6B325' }]}
            handleStyle={[
              { borderColor: '#E6B325', backgroundColor: '#E6B325' },
              { borderColor: '#E6B325', backgroundColor: '#E6B325' },
            ]}
            railStyle={{ backgroundColor: '#E5E7EB' }}
          />
          <div className="flex justify-between font-mono text-sm mt-2">
            <span>{numberFormat(price[0])} ฿</span>
            <span>{numberFormat(price[1])} ฿</span>
          </div>
        </div>
      </div>
      
      {/* Clear Button */}
      <button 
        onClick={handleClearFilters}
        className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        <X size={16} />
        Clear Filters
      </button>
    </div>
  );
};

export default SearchCard;
