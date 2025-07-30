// // components/EditUserModal.tsx
// import React, { useState } from "react";
// import { SalaryRecord } from "../types/salary";

// interface Props {
//   user: SalaryRecord;
//   onClose: () => void;
//   onSave: (updatedUser: FormData, id: string) => void;
// }

// const EditUserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     email: user.email,
//     salaryMonth: user.salaryMonth,
//     salaryAmount: user.salaryAmount,
//     netSalary: user.netSalary,
//     advances: user.advances || "",
//     description: user.description || "",
//     status: user.status,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
//     onSave(data, user._id);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-[400px] space-y-4">
//         <h2 className="text-xl font-bold text-gray-700">Edit User</h2>

//         <input name="email" value={formData.email} onChange={handleChange} className="w-full border px-2 py-1" />
//         <input name="salaryMonth" value={formData.salaryMonth} onChange={handleChange} className="w-full border px-2 py-1" />
//         <input name="salaryAmount" value={formData.salaryAmount} onChange={handleChange} className="w-full border px-2 py-1" />
//         <input name="netSalary" value={formData.netSalary} onChange={handleChange} className="w-full border px-2 py-1" />
//         <input name="advances" value={formData.advances} onChange={handleChange} className="w-full border px-2 py-1" />
//         <input name="description" value={formData.description} onChange={handleChange} className="w-full border px-2 py-1" />
//         <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-2 py-1">
//           <option value="paid">Paid</option>
//           <option value="unpaid">Unpaid</option>
//         </select>

//         <div className="flex justify-end space-x-2">
//           <button onClick={onClose} className="text-gray-500">Cancel</button>
//           <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;
