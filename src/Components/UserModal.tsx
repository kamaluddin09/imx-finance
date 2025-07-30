import React, { useState } from "react";
import axios from "axios";

interface SalaryRecord {
  id: string;
  email: string;
  salaryMonth: string;
  salaryAmount: number;
  netSalary: number;
  advances?: number;
  description?: string;
  dateReceived: string;
  status: string;
}

interface SalaryTableProps {
  salaryData: SalaryRecord[];
  onRowClick: (user: SalaryRecord) => void;
}

const SalaryTable: React.FC<SalaryTableProps> = ({ salaryData, onRowClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<SalaryRecord>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: name === "salaryAmount" ? Number(value) : value,
    }));
  };

  const handleEditClick = (user: SalaryRecord) => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:9999/api/salaries/updateUser/${id}`,
        editedUser
      );
      console.log("Updated:", response.data);
      alert("Salary record updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update");
    }
  };

  return (
    <div className="w-[80%] mx-auto my-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md rounded-md overflow-hidden">
        <thead className="text-xs text-white uppercase bg-gray-800">
          <tr>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Month</th>
            <th className="px-6 py-3">Salary</th>
            <th className="px-6 py-3">Net Salary</th>
            <th className="px-6 py-3">Advances</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Date Received</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onRowClick(user)}
            >
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {isEditing && editedUser.id === user.id ? (
                  <input
                    name="salaryMonth"
                    value={editedUser.salaryMonth || ""}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.salaryMonth
                )}
              </td>
              <td className="px-6 py-4">
                {isEditing && editedUser.id === user.id ? (
                  <input
                    name="salaryAmount"
                    type="number"
                    value={editedUser.salaryAmount || ""}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.salaryAmount
                )}
              </td>
              <td className="px-6 py-4">{user.netSalary}</td>
              <td className="px-6 py-4">{user.advances || "-"}</td>
              <td className="px-6 py-4">{user.description || "-"}</td>
              <td className="px-6 py-4">{user.dateReceived}</td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4 text-white">
                {isEditing && editedUser.id === user.id ? (
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="py-1 px-4 bg-green-600 rounded hover:bg-green-400"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(user);
                    }}
                    className="py-1 px-4 bg-blue-600 rounded hover:bg-blue-400"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;
