import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const registerUser = async (userData) => {
  const response = await API.post('/register', userData);
  return response.data;
};



