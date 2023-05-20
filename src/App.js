import SideHeader from "./Components/SideHeader";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Zone from './Components/Zone';
import City from './Components/City';
import Pharmacy from "./Components/Pharmacy";
import Detail from "./Components/Detail";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';



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
        </Routes>
      </div>
    </BrowserRouter> 
  )
}