import React, { useEffect, useState } from "react";
import { getRentalsAdmin, changeRentalStatus } from "../../api/rental";
import useCarRentalStore from "../../store/carRentalStore";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableRentals = () => {
  const token = useCarRentalStore((state) => state.token);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    handleGetRentals(token);
  }, [token]);

  const handleGetRentals = (token) => {
    getRentalsAdmin(token)
      .then((res) => {
        setRentals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeRentalStatus = (rentalId, rentalStatus) => {
    console.log('Changing status:', { rentalId, rentalStatus }); // Debug log
    
    changeRentalStatus(token, rentalId, rentalStatus)
      .then((response) => {
        console.log('Status change response:', response.data); // Debug log
        toast.success("Update Status Success!!!");
        handleGetRentals(token);
      })
      .catch((err) => {
        console.error('Error changing status:', err);
        if (err.response) {
          toast.error(`Error: ${err.response.data.message || 'Failed to update status'}`);
        } else {
          toast.error('Network error. Please try again.');
        }
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-200";
      case "Active":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200 border">
              <th className="px-4 py-2">ลำดับ</th>
              <th className="px-4 py-2">ผู้ใช้งาน</th>
              <th className="px-4 py-2">วันที่เช่า</th>
              <th className="px-4 py-2">รถยนต์</th>
              <th className="px-4 py-2">รวม</th>
              <th className="px-4 py-2">สถานะ</th>
              <th className="px-4 py-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {rentals?.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">
                  <p>{item.renter.email}</p>
                  <p>{item.renter.name || '-'}</p>
                  <p>{item.renter.telephone || '-'}</p>
                </td>
                <td className="px-4 py-2">
                  <p>เริ่ม: {dateFormat(item.startDate)}</p>
                  <p>สิ้นสุด: {dateFormat(item.endDate)}</p>
                </td>
                <td className="px-4 py-2">
                  <p>{item.car.brand} {item.car.model}</p>
                  <p>ทะเบียน: {item.car.licensePlate}</p>
                </td>
                <td className="px-4 py-2">{numberFormat(item.totalPrice)}</td>
                <td className="px-4 py-2">
                  <span className={`${getStatusColor(item.status)} px-2 py-1 rounded-full text-sm font-semibold`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleChangeRentalStatus(item.id, e.target.value)
                    }
                    className="border rounded-md p-1"
                  >
                    <option>Pending</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRentals;
