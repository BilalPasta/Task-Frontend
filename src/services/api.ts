// services/api.ts
import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Example: 'http://localhost:3001/api'
// });

const baseUrl = "http://localhost:8080";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/user/login`,
    credentials
  );
  return response.data; // Handle token or user data as needed
};

export const signupUser = async (credentials: {
  email: string;
  password: string;
}) => {
  //   console.log(api, "apiapiapi");

  const response = await axios.post(
    `${baseUrl}/api/v1/user/signup`,
    credentials
  );
  return response.data;
};

// Media upload API call
export const uploadMedia = async (file: File, description: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("contentType", file.type);
  formData.append("description", description);

  const response = await axios.post(
    `${baseUrl}/api/v1/media/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data; // Assuming the response contains the uploaded file's data, including the sharable ID
};

// Fetch media by sharable ID
export const getMediaBySharableId = async (sharableId: string) => {
  const response = await axios.get(
    `${baseUrl}/api/v1/media/sharableId/${sharableId}`
  );
  return response.data; // Assuming the response contains the media details
};
