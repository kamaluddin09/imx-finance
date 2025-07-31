import axios from "axios";


const BASE_URL = "http://localhost:9999/api/salaries";


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

// export const updateUser = async (id: string, formData: FormData) => {
//   const res = await axios.put(
//     `http://localhost:9999/api/updateUser/${id}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//   return res.data;
// };


