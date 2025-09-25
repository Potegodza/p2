import React, { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useCarRentalStore from "../../store/carRentalStore";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useCarRentalStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, [token]);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("Update Status Success!!");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("Update Role Success!!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ลำดับ</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">ชื่อ</th>
            <th className="px-4 py-2">เบอร์โทรศัพท์</th>
            <th className="px-4 py-2">สิทธิ์</th>
            <th className="px-4 py-2">สถานะ</th>
            <th className="px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2 text-center">{i + 1}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.name || "-"}</td>
              <td className="px-4 py-2">{user.telephone || "-"}</td>
              <td className="px-4 py-2 text-center">
                <select
                  onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                  value={user.role}
                  className="border rounded-md p-1"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="px-4 py-2 text-center">{user.enabled ? "Active" : "Inactive"}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className={`p-2 rounded-md shadow-md text-white ${user.enabled ? 'bg-yellow-500' : 'bg-green-500'}`}
                  onClick={() => handleChangeUserStatus(user.id, user.enabled)}
                >
                  {user.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;

