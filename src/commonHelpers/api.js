import axios from "axios";
import config from "../config";
import {appendTimestampToUrl} from '../commonHelpers/utils';

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
    const response = await axiosInstance.get(appendTimestampToUrl(endpoint), { params: options });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(appendTimestampToUrl(endpoint), data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    throw error;
  }
};
