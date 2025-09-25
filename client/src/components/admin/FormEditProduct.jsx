import React, { useEffect, useState } from 'react';
import useCarRentalStore from '../../store/carRentalStore';
import { readCar, updateCar } from '../../api/car';
import { toast } from 'react-toastify';
import Uploadfile from './Uploadfile';
import { useParams, useNavigate } from 'react-router-dom';

const FormEditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useCarRentalStore((state) => state.token);

  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: 0,
    licensePlate: '',
    pricePerDay: 0,
    images: [],
  });

  useEffect(() => {
    fetchCar(token, id);
  }, []);

  const fetchCar = async (token, id) => {
    try {
      const res = await readCar(token, id);
      setForm(res.data);
    } catch (err) {
      console.log('Error fetching car data', err);
      toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลรถยนต์');
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(token, id, form);
      toast.success(`แก้ไขข้อมูลรถยนต์ ${form.brand} สำเร็จ`);
      navigate('/admin/cars');
    } catch (err) {
      console.log(err);
      toast.error('เกิดข้อผิดพลาดในการแก้ไขรถยนต์');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลรถยนต์</h1>
        <div className="space-y-4">
          <input
            className="border w-full p-2 rounded"
            value={form.brand || ''}
            onChange={handleOnChange}
            placeholder="ยี่ห้อ (Brand)"
            name="brand"
          />
          <input
            className="border w-full p-2 rounded"
            value={form.model || ''}
            onChange={handleOnChange}
            placeholder="รุ่น (Model)"
            name="model"
          />
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={form.year || 0}
            onChange={handleOnChange}
            placeholder="ปี (Year)"
            name="year"
          />
          <input
            className="border w-full p-2 rounded"
            value={form.licensePlate || ''}
            onChange={handleOnChange}
            placeholder="ทะเบียนรถ"
            name="licensePlate"
          />
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={form.pricePerDay || 0}
            onChange={handleOnChange}
            placeholder="ราคาต่อวัน (Price per day)"
            name="pricePerDay"
          />
        </div>
        <hr className="my-4" />
        <Uploadfile form={form} setForm={setForm} />
        <button
          className="bg-green-500 p-2 rounded-md shadow-md text-white
          hover:scale-105 hover:-translate-y-1 hover:duration-200"
        >
          แก้ไขรถยนต์
        </button>
      </form>
    </div>
  );
};

export default FormEditCar;
