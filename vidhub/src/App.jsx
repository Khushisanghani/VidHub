import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddVideo from "./Pages/AddVideo";
import "./App.css"
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import VideoCard from "./component/VideoCard";
import HomePage from "./Pages/HomePage";
import NavBar from "./component/NavBar";
import Profile from "./component/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <BrowserRouter>
     <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/addvideo" element={<AddVideo/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/videocard" element={<VideoCard/>}/>
        <Route path="profile" element={<Profile/>} />
         
      </Routes>
    </BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
