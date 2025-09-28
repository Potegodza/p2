import React, { useEffect, useState } from 'react';
import useCarRentalStore from '../../store/carRentalStore';
import { createCar, deleteCar, listCar, changeCarStatus } from '../../api/car';
import { toast } from 'react-toastify';
import Uploadfile from './Uploadfile';
import { Link } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';
import { numberFormat } from '../../utils/number';
import { dateFormat } from '../../utils/dateformat';

const initialState = {
  brand: '',
  model: '',
  year: 2024,
  licensePlate: '',
  pricePerDay: 0,
  images: [],
};

const FormCar = () => {
  const token = useCarRentalStore((state) => state.token);
  const cars = useCarRentalStore((state) => state.cars);
  const getCar = useCarRentalStore((state) => state.getCar);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCar(100);
  }, [getCar]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: (name === 'year' || name === 'pricePerDay') ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createCar(token, form);
      setForm(initialState);
      getCar();
      toast.success(`เพิ่มข้อมูลรถยนต์ ${res.data.brand} สำเร็จ`);
    } catch (err) {
      console.error(err);
      toast.error('เกิดข้อผิดพลาดในการเพิ่มรถยนต์');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('ยืนยันการลบรถยนต์?')) {
      try {
        await deleteCar(token, id);
        toast.success('ลบรถยนต์เรียบร้อยแล้ว');
        getCar();
      } catch (err) {
        console.error(err);
        toast.error('เกิดข้อผิดพลาดในการลบรถยนต์');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeCarStatus(token, id, newStatus);
      toast.success(`Car status updated to ${newStatus === 'available' ? 'AVAILABLE' : newStatus === 'rented' ? 'RENTED' : 'MAINTENANCE'} successfully`);
      getCar();
    } catch (err) {
      console.error(err);
      toast.error('Error updating car status');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="mb-8">
        <h1 className="text-2xl font-bold mb-4">เพิ่ม/จัดการข้อมูลรถยนต์</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border w-full p-2 rounded"
            value={form.brand}
            onChange={handleOnChange}
            placeholder="ยี่ห้อ (Brand)"
            name="brand"
          />
          <input
            className="border w-full p-2 rounded"
            value={form.model}
            onChange={handleOnChange}
            placeholder="รุ่น (Model)"
            name="model"
          />
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={form.year}
            onChange={handleOnChange}
            placeholder="ปี (Year)"
            name="year"
          />
          <input
            className="border w-full p-2 rounded"
            value={form.licensePlate}
            onChange={handleOnChange}
            placeholder="ทะเบียนรถ"
            name="licensePlate"
          />
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={form.pricePerDay}
            onChange={handleOnChange}
            placeholder="ราคาต่อวัน"
            name="pricePerDay"
          />
        </div>
        <hr className="my-4" />
        <Uploadfile form={form} setForm={setForm} />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md shadow-md text-white
          hover:bg-blue-600 transition-colors"
        >
          เพิ่มรถยนต์
        </button>
      </form>

      <hr className="my-8" />
      <h2 className="text-xl font-bold mb-4">All Cars</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Brand/Model</th>
              <th className="px-4 py-2">License Plate</th>
              <th className="px-4 py-2">Price/Day</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Last Updated</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    className="w-24 h-16 rounded-lg shadow-md object-cover"
                    src={item.images.length > 0 ? item.images[0].url : '/car-placeholder.svg'}
                    alt={`${item.brand} ${item.model}`}
                  />
                </td>
                <td className="px-4 py-2 text-left">
                  <p className="font-bold">{item.brand}</p>
                  <p className="text-sm text-gray-600">{item.model} ({item.year})</p>
                </td>
                <td className="px-4 py-2 text-center">{item.licensePlate}</td>
                <td className="px-4 py-2 text-right">{numberFormat(item.pricePerDay)}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    item.status === 'available' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : item.status === 'rented' 
                      ? 'bg-red-100 text-red-800 border border-red-200' 
                      : 'bg-brand-gold text-brand-dark border border-yellow-200'
                  }`}>
                    {item.status === 'available' ? 'AVAILABLE' : 
                     item.status === 'rented' ? 'RENTED' : 
                     item.status === 'maintenance' ? 'MAINTENANCE' : item.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">{dateFormat(item.updatedAt)}</td>
                <td className="px-4 py-2 flex gap-2 justify-center items-center">
                  {/* ❗️❗️ แก้ไข to=... ใน Link นี้ */}
                  <Link
                    to={`/admin/cars/${item.id}`} 
                    className="bg-yellow-500 rounded-md p-2 text-white hover:bg-yellow-600 shadow-md"
                  >
                    <Pencil size={16}/>
                  </Link>
                  
                  {/* Status Change Buttons */}
                  <div className="flex flex-col gap-1">
                    {item.status !== 'available' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'available')}
                        className="bg-green-600 rounded-md px-2 py-1 text-white text-xs hover:bg-green-700 shadow-md transition-colors"
                      >
                        AVAILABLE
                      </button>
                    )}
                    {item.status !== 'rented' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'rented')}
                        className="bg-red-600 rounded-md px-2 py-1 text-white text-xs hover:bg-red-700 shadow-md transition-colors"
                      >
                        RENTED
                      </button>
                    )}
                    {item.status !== 'maintenance' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'maintenance')}
                        className="bg-brand-gold text-brand-dark rounded-md px-2 py-1 text-xs hover:bg-yellow-400 shadow-md transition-colors font-semibold"
                      >
                        MAINTENANCE
                      </button>
                    )}
                  </div>
                  
                  <button
                    className="bg-red-500 rounded-md p-2 text-white shadow-md hover:bg-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormCar;