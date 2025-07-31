import React, { useEffect, useState } from "react";
import { uploadSalaryFile, getSalaryData } from "../API/salaryApi";
import SalaryTable from "../Components/SalaryTable";
import UserModal from "../Components/UserModal";

const finance: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [salaryData, setSalaryData] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");
    setIsUploading(true);

    try {
      const data = await uploadSalaryFile(file); //post API
      setMessage(data.message || "File uploaded successfully");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const fetchSalaryData = async () => {
    try {
      const result = await getSalaryData(); //GET API
      setSalaryData(result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="p-8 bg-[#f0f2f5] "> {/* Light grey background for the whole page */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header
          className="w-full h-32 rounded-lg p-6 flex items-center justify-between shadow-lg"
          style={{ background: 'linear-gradient(to right, #8A2BE2, #4B0082)' }} // Violet to Indigo gradient
        >
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Finance Portal</h1>
            <p className="text-white text-lg opacity-80">Salary & Payroll Management</p>
          </div>
          <div className="text-right text-white text-sm opacity-70">
            {/* <p>Powered by MX</p> */}
            <p>Secure & Smart</p>
          </div>
        </header>

        {/* Cards Section */}
        
      </div>
    </div>

      {/* <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6"> */}
      <div className="bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
          {/* <h1 className="text-3xl font-extrabold text-[#f1ab27] mb-8 text-center tracking-wide">
            Upload Salary Excel
          </h1> */}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-center gap-4"
          >
            {/* File Input */}
            <label className="w-full lg:flex-1">
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:bg-purple-50 file:text-purple-700
          hover:file:bg-purple-100 file:cursor-pointer
          transition-all duration-200 ease-in-out"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="bg-[#f1ab27] text-white py-2 px-6 rounded-lg
        hover:bg-[#d19115] transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-6 text-center text-sm text-green-600 font-medium">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      {salaryData.length > 0 && (
        <div className="overflow-auto rounded-lg shadow-md">
          <SalaryTable
            salaryData={salaryData}
            onRowClick={
              (user) => setSelectedUser({ ...user, id: user._id }) // ✅ Map _id → id here
            }
          />
        </div>
      )}
      {/* User Details Modal */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      {/* </div> */}
    </div>
  );
};

export default finance;
