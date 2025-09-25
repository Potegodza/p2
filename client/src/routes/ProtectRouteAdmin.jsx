import React, { useState, useEffect } from 'react';
// ❗️ 1. แก้ไขการ import store
import useCarRentalStore from '../store/carRentalStore';
import { currentAdmin } from '../api/auth';
import LoadingToRedirect from './LoadingToRedirect';

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false);
    // ❗️ 2. แก้ไขการเรียกใช้ store
    const user = useCarRentalStore((state) => state.user);
    const token = useCarRentalStore((state) => state.token);

    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
                .then((res) => {
                    console.log("Admin access granted:", res.data);
                    setOk(true);
                })
                .catch((err) => {
                    console.error("Admin access denied:", err);
                    setOk(false);
                });
        } else {
            setOk(false);
        }
    }, [user, token]); // ❗️ 3. เพิ่ม dependencies ให้ useEffect ทำงานเมื่อ user/token เปลี่ยน

    return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;