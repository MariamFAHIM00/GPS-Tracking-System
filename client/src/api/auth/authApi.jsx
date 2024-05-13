import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth"; // Replace this with your API base URL

export const handleLogin = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password
  });
  return response.data;
};