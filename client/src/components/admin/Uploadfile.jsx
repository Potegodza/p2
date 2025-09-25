import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
// ❗️ 1. เพิ่มการ import ฟังก์ชันที่ขาดไปจาก api/car
import { uploadFiles, removeFiles } from '../../api/car'; 
// ❗️ 2. แก้ไขการ import store ให้ถูกต้อง
import useCarRentalStore from '../../store/carRentalStore';
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
    // ❗️ 3. แก้ไขการเรียกใช้ store ให้ถูกต้อง
    const token = useCarRentalStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        const files = e.target.files;
        if (files) {
            setIsLoading(true);
            let allFiles = form.images || []; // ป้องกันกรณี form.images เป็น undefined
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`);
                    continue;
                }
                
                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadFiles(token, data)
                            .then((res) => {
                                allFiles.push(res.data);
                                setForm({
                                    ...form,
                                    images: allFiles
                                });
                                if (i === files.length - 1) { // เมื่ออัปโหลดไฟล์สุดท้ายเสร็จ
                                    setIsLoading(false);
                                }
                                toast.success('อัปโหลดรูปภาพสำเร็จ!');
                            })
                            .catch((err) => {
                                console.log(err);
                                setIsLoading(false);
                                toast.error('เกิดข้อผิดพลาดในการอัปโหลด');
                            });
                    },
                    "base64"
                );
            }
        }
    };

    const handleDelete = (public_id) => {
        setIsLoading(true);
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = form.images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setForm({
                    ...form,
                    images: filterImages
                });
                setIsLoading(false);
                toast.success("ลบรูปภาพสำเร็จ");
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error("เกิดข้อผิดพลาดในการลบรูปภาพ");
            });
    };

    return (
        <div className='my-4 p-4 border rounded-lg'>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                อัปโหลดรูปภาพ
            </label>
            <div className='flex flex-wrap gap-4 my-4'>
                {isLoading && <Loader className='w-24 h-24 animate-spin text-blue-500'/>}
                
                {!isLoading && form.images && form.images.map((item, index) =>
                    <div className='relative' key={index}>
                        <img
                            className='w-24 h-24 object-cover rounded-md shadow-md'
                            src={item.url} 
                            alt={`upload-${index}`}
                        />
                        <span
                            onClick={() => handleDelete(item.public_id)}
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer w-6 h-6 flex items-center justify-center text-xs shadow-lg'
                        >
                            X
                        </span>
                    </div>
                )}
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
        </div>
    );
};

export default Uploadfile;