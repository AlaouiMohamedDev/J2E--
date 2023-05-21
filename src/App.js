import SideHeader from "./Components/SideHeader";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Zone from './Components/Zone';
import City from './Components/City';
import Pharmacy from "./Components/Pharmacy";
import Detail from "./Components/Detail";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Login from "./Components/Login";
import Register from "./Components/Register";
import axios from "axios";



export default function App() {
  const [cookies, setCookie] = useCookies(['name']);

  const [position, setPosition] = useState(null);
  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle successful retrieval of the position
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setCookie('lat',position.coords.latitude)
          setCookie('long',position.coords.longitude)
        },
        (error) => {
          // Handle error while retrieving the position
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

  }, []); 

  const fecthUser = async()=>{
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/user",{jwt:cookies.jwt});
     
        setCookie('userId',response.data.id)
        setCookie('first_name',response.data.first_name)
        setCookie('last_name',response.data.last_name)
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if(cookies.jwt != null )
    {
      fecthUser();
    }
  },[cookies.jwt])


  return (
    <BrowserRouter>
      <div className="w-full bg-gray-100 h-screen">
        <SideHeader />
        <Routes >
          <Route path="/" element={<Home/>}></Route>
          <Route path="/city" element={<City />}></Route>
          <Route path="/pharmacy" element={<Pharmacy />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/zone" element={<Zone />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter> 
  )
}