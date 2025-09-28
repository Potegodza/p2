import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  Users,
  Car,
  DollarSign,
  BarChart3
} from 'lucide-react';

const ReportCard = ({ title, description, icon, color, onClick }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className={`text-3xl ${color} p-3 rounded-full`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <Download className="w-5 h-5 text-gray-400" />
    </div>
  </motion.div>
);

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: "Monthly Revenue Report",
      description: "รายงานรายได้รายเดือน",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 2,
      title: "User Activity Report",
      description: "รายงานการใช้งานของผู้ใช้",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 3,
      title: "Car Utilization Report",
      description: "รายงานการใช้งานรถยนต์",
      icon: <Car className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      title: "Rental Trends Report",
      description: "รายงานแนวโน้มการเช่า",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 5,
      title: "Customer Satisfaction Report",
      description: "รายงานความพึงพอใจลูกค้า",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: 6,
      title: "Financial Summary Report",
      description: "รายงานสรุปทางการเงิน",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const handleReportClick = (report) => {
    setSelectedReport(report);
    // Simulate report generation
    console.log('Generating report:', report.title);
    
    // Show success message
    setTimeout(() => {
      alert(`Report "${report.title}" has been generated successfully!`);
      setSelectedReport(null);
    }, 1500);
  };

  return (
    <motion.div 
      className="p-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports</h1>
        <p className="text-gray-600">สร้างและดาวน์โหลดรายงานต่างๆ ของระบบ</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <ReportCard
              title={report.title}
              description={report.description}
              icon={report.icon}
              color={report.color}
              onClick={() => handleReportClick(report)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Date Range Selector */}
      <motion.div 
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">เลือกช่วงเวลา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เริ่มต้น</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">วันที่สิ้นสุด</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <motion.button 
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              สร้างรายงาน
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
