import React, { useEffect, useState } from "react";
import { uploadSalaryFile, getSalaryData } from "../API/salaryApi";
import SalaryTable from "../Components/SalaryTable";
import UserModal from "../Components/UserModal";
import SalaryFilter from "../Components/SalaryFilter";
import { Upload, FileSpreadsheet, CheckCircle, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type{ SalaryRecord } from "../types/Types";

const Finance: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [salaryData, setSalaryData] = useState<SalaryRecord[]>([]);
  const [filteredData, setFilteredData] = useState<SalaryRecord[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SalaryRecord | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warn("Please select a file.");
      return;
    }

    setIsUploading(true);

    try {
      const data = await uploadSalaryFile(file);
      toast.success(data.message || "File uploaded successfully");
      setFile(null);
      fetchSalaryData(); // Refresh
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const fetchSalaryData = async () => {
    try {
      const result = await getSalaryData();
      setSalaryData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching salary data", error);
      toast.error("Failed to fetch salary data.");
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);

  const handleFilter = (field: keyof SalaryRecord, query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = salaryData.filter((item) =>
      item[field]?.toString().toLowerCase().includes(lowerQuery)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen py-1 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div> */}
        <div className="relative max-w-full mx-auto  py-6 ">
          <header className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <FileSpreadsheet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              Finance Portal
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
              Streamlined Salary & Payroll Management System
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          </header>
        </div>
      </div>

      {/* Upload Section */}
      <div className="relative mt-4 px-4 pb-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Upload className="w-4 h-4 text-purple-600" />
                Upload Excel File
              </h2>
              <p className="text-sm text-gray-600">
                Select your payroll Excel file to process salary data
              </p>
            </div>

            <div className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* File Input */}
                <div className="relative">
                  <label className="block">
                    <div
                      className={`
                  relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ease-in-out
                  ${
                    file
                      ? "border-green-400 bg-green-50/50"
                      : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30"
                  }
                `}
                    >
                      <input
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />

                      <div className="flex flex-col items-center gap-2">
                        {file ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md flex items-center justify-center">
                            <Upload className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {file ? file.name : "Choose file or drag & drop"}
                          </p>
                          <p className="text-xs text-gray-500">
                            .xls and .xlsx files up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isUploading || !file}
                    className={`
                px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 ease-in-out
                ${
                  isUploading || !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:scale-105 hover:shadow-md active:scale-95"
                }
              `}
                  >
                    <div className="flex items-center gap-2">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Table and Filter */}
      {salaryData.length > 0 && (
        <div className="max-w-6xl mx-auto px-2">
          <SalaryFilter onFilter={handleFilter} />
          <SalaryTable
            salaryData={filteredData}
            onRowClick={(user) => setSelectedUser(user)}
          />
        </div>
      )}

      {/* User Modal */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Finance;
