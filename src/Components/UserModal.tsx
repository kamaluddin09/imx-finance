import React, { useEffect, useState } from "react";
import axios from "axios";

interface SalaryRecord {
_id: string;
  email: string;
  salaryMonth: string;
  salaryAmount: number;
  netSalary: number;
  advances?: number;
  description?: string;
  dateReceived: string;
  status: string;
}

interface UserPanelProps {
  user: SalaryRecord;
  onClose: () => void;
}

const UserModel: React.FC<UserPanelProps> = ({ user, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<SalaryRecord>(user);

  // Show panel on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sync state with user prop and validate ID
  useEffect(() => {
    console.log("User prop received:", user);
    if (!user?._id) {
      console.warn("⚠️ User object is missing 'id'. Update will fail.");
    }
    setEditedUser(user);
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const numericFields = ["salaryAmount", "netSalary", "advances"];

    setEditedUser((prev) => {
      const newValue = numericFields.includes(name)
        ? value === "" ? "" : Number(value)
        : value;

      return {
        ...prev,
        [name]: newValue,
        id: prev._id, // Explicitly preserve ID
      };
    });
  };

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }try {
      console.log("🔁 Updating user ID:", editedUser._id);
      const response = await axios.put(
        `http://localhost:9999/api/salaries/${editedUser._id}`,
        editedUser
      );
      console.log("✅ Updated:", response.data);
      alert("Salary record updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Update failed", err);
      alert("Failed to update");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="absolute inset-0 bg-gray-50/50 transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      <div
        className={`relative bg-white w-full max-w-md h-full shadow-xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 overflow-y-auto h-full">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-xl font-bold mb-6">Salary Details</h2>

          <table className="w-full text-sm text-left border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                <th className="py-3 px-4 font-semibold w-1/3">Field</th>
                <th className="py-3 px-4 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="py-3 px-4 font-medium">Email</th>
                <td className="py-3 px-4">{editedUser.email}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Month</th>
                <td className="py-3 px-4">
                  {isEditing ? (
                    <input
                      name="salaryMonth"
                      value={editedUser.salaryMonth}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    editedUser.salaryMonth
                  )}
                </td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Amount</th>
                <td className="py-3 px-4">
                  {isEditing ? (
                    <input
                      name="salaryAmount"
                      type="number"
                      value={editedUser.salaryAmount}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    `₹${editedUser.salaryAmount}`
                  )}
                </td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Net Salary</th>
                <td className="py-3 px-4">
                  {isEditing ? (
                    <input
                      name="netSalary"
                      type="number"
                      value={editedUser.netSalary}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    `₹${editedUser.netSalary}`
                  )}
                </td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Advances</th>
                <td className="py-3 px-4">
                  {isEditing ? (
                    <input
                      name="advances"
                      type="string"
                      value={editedUser.advances ?? ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    editedUser.advances ?? "-"
                  )}
                </td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Description</th>
                <td className="py-3 px-4">
                  {isEditing ? (
                    <input
                      name="description"
                      value={editedUser.description ?? ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    editedUser.description ?? "-"
                  )}
                </td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Date Received</th>
                <td className="py-3 px-4">
                  {new Date(editedUser.dateReceived).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-medium">Status</th>
                <td className="py-3 px-4">
                  {isEditing ? (
                    <select
                      name="status"
                      value={editedUser.status}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        editedUser.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {editedUser.status}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-end text-white">
            <button
              onClick={handleUpdate}
              className="py-2 px-7 rounded bg-green-600 hover:bg-green-300"
            >
              {isEditing ? "Save" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModel;
