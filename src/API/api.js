import axios from "axios";

// Base URL for your API
export const BASE_URL =  process.env.REACT_APP_API_URL|| "http://localhost:8000/api";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Generalized API request helper
export const apiRequest = async (endpoint, data = {}, method = "get") => {
  const token = getToken();
  const isFormData = data instanceof FormData;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    // For FormData, don't set Content-Type, axios handles it
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      headers,
      ...(method === "get" ? { params: data } : { data }),
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: error.message };
  }
};

// Auth APIs

export const loginAPI = async (payload) => {
  const data = await apiRequest("/user/login", payload, "post");
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const getUserInfo = async () => {
  return await apiRequest("/user/getUserInfo", {}, "get");
};

export const logoutAPI = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect to login page after logout
};

export default axiosInstance;
