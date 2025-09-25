// src/components/admin/FormCategory.jsx

import React, { useState, useEffect } from 'react';
// Corrected the import path to point to the correct file
import useCarRentalStore from '../../store/carRentalStore';
import { toast } from 'react-toastify';

const FormCategory = () => {
  const token = useCarRentalStore((state) => state.token);
  const [name, setName] = useState('');
  const categories = useCarRentalStore((state) => state.categories);
  const getCategory = useCarRentalStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) {
      return toast.warning('Please fill data');
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`Add Category ${res.data.name} success!!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Deleted ${res.data.name} success`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
      <h1>Category Management</h1>
      <form className='my-4' onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className='border'
          type='text'
        />
        <button className='bg-blue-500'>Add Category</button>
      </form>
      <hr />
      <ul className='list-none'>
        {categories.map((item, index) => (
          <li className='flex justify-between my-2' key={index}>
            <span>{item.name}</span>
            <button
              className='bg-red-500'
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;