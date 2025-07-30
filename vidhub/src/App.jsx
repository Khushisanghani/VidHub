import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import AddVideo from "./Pages/AddVideo";
import ShowVideos from "./Pages/ShowVideos";
import Login from "./Pages/Login";
import "./App.css"
import Register from "./Pages/Register";
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<AddVideo/>}/>
        <Route path="/videos" element={<ShowVideos/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
