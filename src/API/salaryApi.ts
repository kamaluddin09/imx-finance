// salaryApi.ts

import axios from "axios";

const BASE_URL = "http://localhost:5555/api";

// Upload salary file
export const uploadSalaryFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(BASE_URL + "/salaries/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get all salary data
export const getSalaryData = async () => {
  const response = await axios.get(BASE_URL + "/salaries");
  return response.data?.result;
};

// ✅ NEW: Update salary by ID
export const updateSalaryById = async (id: string, updatedData: any) => {
  const response = await axios.put(`${BASE_URL}/salaries/${id}`, updatedData);
  return response.data;
};
