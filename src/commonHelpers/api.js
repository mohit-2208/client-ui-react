import axios from "axios";
import config from "../config";

// export const useGetData = () => {
//   const axiosInstance = handleAxiosInstance();

//   const getData = async (endpoint) => {
//     try {
//       const response = await axiosInstance.get(endpoint);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error;
//     }
//   };

//   return getData;
// };

const axiosInstance = axios.create({
  baseURL: config.apiEndpoint,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("invoice_discounting_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getData = async (endpoint, options = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params: options });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    throw error;
  }
};
