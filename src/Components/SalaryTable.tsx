// components/SalaryTable.tsx
import React from "react";

interface SalaryRecord {
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

// const SalaryTable: React.FC<SalaryTableProps> = ({ salaryData }) => {
    const SalaryTable: React.FC<SalaryTableProps> = ({ salaryData, onRowClick }) => {

  if (salaryData.length === 0) return null;

  return (
    <div className="overflow-auto rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-[#f1ab27]">
        Uploaded Salary Records
      </h3>

      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
        <thead className="bg-[#f1ab27] text-white sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Month</th>
            <th className="py-3 px-4">Amount</th>
            {/* <th className="py-3 px-4">Net Salary</th> */}
            {/* <th className="py-3 px-4">Advances</th> */}
            <th className="py-3 px-4">Description</th>
            {/* <th className="py-3 px-4">Date Received</th> */}
            {/* <th className="py-3 px-4">Status</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {salaryData.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-[#fef9ee] transition-colors duration-200"
               onClick={() => onRowClick(row)}
            >
              <td className="py-3 px-4">{row.email}</td>
              <td className="py-3 px-4">{row.salaryMonth}</td>
              <td className="py-3 px-4">₹{row.salaryAmount}</td>
              {/* <td className="py-3 px-4">₹{row.netSalary}</td> */}
              {/* <td className="py-3 px-4">{row.advances || "-"}</td> */}
              <td className="py-3 px-4">{row.description || "-"}</td>
              {/* <td className="py-3 px-4">
                {new Date(row.dateReceived).toLocaleDateString()}
              </td> */}
              {/* <td className="py-3 px-4 capitalize">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    row.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {row.status}
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;
