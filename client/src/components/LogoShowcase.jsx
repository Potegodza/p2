import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { MinimalistLogo, LuxuryLogo, SpeedLogo, RoadLogo } from './LogoVariants';

const LogoShowcase = () => {
  const [selectedLogo, setSelectedLogo] = useState('main');

  const logos = [
    {
      id: 'main',
      name: 'Main Logo',
      component: Logo,
      description: 'โลโก้หลัก - มีรถ ถนน และข้อความ'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      component: MinimalistLogo,
      description: 'โลโก้แบบมินิมอล - เรียบง่าย สะอาด'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      component: LuxuryLogo,
      description: 'โลโก้แบบหรูหรา - เหมาะสำหรับรถหรู'
    },
    {
      id: 'speed',
      name: 'Speed',
      component: SpeedLogo,
      description: 'โลโก้แบบความเร็ว - มีเส้นความเร็ว'
    },
    {
      id: 'road',
      name: 'Road',
      component: RoadLogo,
      description: 'โลโก้แบบถนน - เน้นถนนและเส้นทาง'
    }
  ];

  const LogoComponent = logos.find(logo => logo.id === selectedLogo)?.component || Logo;

  return (
    <div className="min-h-screen bg-[#F5F1EA] py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#2C3E50] mb-4">
            Logo Showcase
          </h1>
          <p className="text-lg text-gray-600">
            เลือกโลโก้ที่เหมาะกับเว็บไซต์ของคุณ
          </p>
        </motion.div>

        {/* Logo Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedLogo === logo.id
                  ? 'border-[#E6B325] bg-[#E6B325]/10'
                  : 'border-gray-300 hover:border-[#E6B325]/50'
              }`}
              onClick={() => setSelectedLogo(logo.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center mb-4">
                <LogoComponent size="large" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">
                {logo.name}
              </h3>
              <p className="text-sm text-gray-600">
                {logo.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Selected Logo Display */}
        <motion.div
          key={selectedLogo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">
            {logos.find(logo => logo.id === selectedLogo)?.name}
          </h2>
          
          <div className="flex flex-col items-center space-y-8">
            {/* Different Sizes */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <LogoComponent size="small" />
                <p className="text-sm text-gray-600 mt-2">Small</p>
              </div>
              <div className="text-center">
                <LogoComponent size="default" />
                <p className="text-sm text-gray-600 mt-2">Default</p>
              </div>
              <div className="text-center">
                <LogoComponent size="large" />
                <p className="text-sm text-gray-600 mt-2">Large</p>
              </div>
              <div className="text-center">
                <LogoComponent size="xl" />
                <p className="text-sm text-gray-600 mt-2">XL</p>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="w-full max-w-4xl">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">
                Usage Examples:
              </h3>
              
              {/* Navigation Bar Example */}
              <div className="bg-[#2C3E50] p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <LogoComponent size="default" />
                  <div className="flex space-x-4 text-white">
                    <span>Home</span>
                    <span>Cars</span>
                    <span>About</span>
                  </div>
                </div>
              </div>

              {/* Footer Example */}
              <div className="bg-gray-800 p-6 rounded-lg mb-4">
                <div className="flex items-center justify-center">
                  <LogoComponent size="large" />
                </div>
              </div>

              {/* Card Example */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                  <LogoComponent size="small" />
                  <div>
                    <h4 className="font-semibold text-[#2C3E50]">Car Rental Service</h4>
                    <p className="text-sm text-gray-600">Premium car rental experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gray-900 text-green-400 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Implementation Code:
          </h3>
          <pre className="text-sm overflow-x-auto">
{`// Import the logo component
import Logo from './components/Logo';

// Use in your component
<Logo size="default" showText={true} />

// Available props:
// - size: 'small' | 'default' | 'large' | 'xl'
// - showText: boolean (show/hide text)
// - className: string (additional CSS classes)`}
          </pre>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoShowcase;



