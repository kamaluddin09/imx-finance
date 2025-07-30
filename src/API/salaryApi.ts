
import axios from "axios";
// import { SalaryRecord } from "../types/salaryTypes";

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


// POST API
const BASE_URL = "http://localhost:9999/api/salaries";


// import { SalaryRecord } from "./components/salaryTypes"; // optional, if types in separate file



// export const updateSalaryRecord = async (updatedUser: SalaryRecord) => {
//   const response = await axios.put(BASE_URL + `/updateUser/${id}`, updatedUser);
//   return response.data;
// };


export const uploadSalaryFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(BASE_URL + "/upload", formData,{
    headers:{
       "Content-Type": "multipart/form-data",
    }
  });
  return response.data
}


// GET API

export const getSalaryData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data?.result;
};

export const updateUser = async (id: string, formData: FormData) => {
  const res = await axios.put(
    `http://localhost:9999/api/updateUser/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`http://localhost:9999/api/deleteUser/${id}`);
  return res.data;
};
