import axios from 'axios';
import { useUserStore } from '../store/userStore';
// import { jsxs } from 'react/jsx-runtime';
const API = 'http://localhost:5000/api';
// Register User
export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API}/register`,userData , {
      headers:{
            'Content-Type': 'application/json',
      },
       withCredentials: true,
    }); 
  } catch (error) {
    console.log(error);
  }
}
// Login User
export const loginUser = async (loginData) => {
  const res = await axios.post(`${API}/login`, loginData);
  const { user, token } = res.data;
  useUserStore.getState().login(user, token);
  return res;
};
// add video 
export const addVideo = async (data) => {
  try {
    return await axios.post(`${API}/video`,data,{
      headers:{'Content-Type' : 'application/json'},
       withCredentials: true,
    })
  } catch (error) {
    console.log(error);
    
  }
}
export const getAllVideos = async () => {
  try {
    const response = await axios.get(`${API}/video`, {
      headers: {
        'Content-Type': 'application/json',
      },
       withCredentials: true,
    });
    return response.data;  
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    throw error;  
  }
};
// like video
export const Like = async (videoId, token) => {
  try {
    const response = await axios.post(
      `${API}/video/like`, 
      { videoId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Toggle Like Error:", error.response?.data || error.message);
    throw error;
  }
};
// comment
export const addComment = async (videoId, text, token) => {
  try {
    const res = await axios.post(
      `${API}/comment`,
      { videoId, text },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Add Comment Error:", error.response?.data || error.message);
    throw error;
  }
};
// get comment
export const getComments = async (videoId) => {
  try {
    const res = await axios.get(`${API}/comment/${videoId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Get Comments Error:", error.response?.data || error.message);
    throw error;
  }
};
