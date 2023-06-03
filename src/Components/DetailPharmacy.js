import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Destinations from './Map/Destinations';
import SideHeader from './SideHeader'

function DetailPharmacy() {

    const location = useLocation();

    const pathname = location.pathname;
    const id = pathname.split('/detailpharmacy/')[1];

    const [pharmacy, setPharmacy] = useState(null);

    // Fonction pour récupérer la liste des cities depuis le backend 
    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pharmacies');
            console.log(response.data.filter(phr => phr.id == id)[0])
            setPharmacy(response.data.filter(phr => phr.id == id)[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const [latlong,setLatLong] = useState({
        lat:31.5962347,
        long:-7.9685221
    })
    console.log("detail:",latlong)
    useEffect(()=>{
        fetchPharmacies();
    },[])


  return pharmacy !=null &&(
    <>
        <SideHeader />
        <div className=" flex flex-col space-y-5 relative font-poppins">
              <img src="/authP.png" className="absolute opacity-20 object-cover w-full h-screen z-0" />
             <div className="flex flex-col space-y-5 pl-[360px] pr-[20px] z-20">
                <div className="flex items-center space-x-3">
                <img src="/drugstore.png" className="w-7" />
                <h1 className='font-bold text-Cred'>Destination to your pharmacy</h1>
             </div>
             <div className='flex  space-x-7 '>
             <div className='flex flex-col items-center justify-center w-1/2'>
                    <img src={pharmacy.image} className='shadow w-[260px] h-[260px] rounded-full object-cover' />
                    <h1 className='font-semibold text-Cred text-xl pt-3 font-mogra'>{pharmacy.nom}</h1>
                    <div className='flex items-center space-x-2 text-black/60'>
                        <i className='bx bxs-map-pin' ></i>
                        <span className='text-[12px]'>{pharmacy.adresse}</span>
                    </div>
             </div>

             <Destinations field={{
            lat:pharmacy.latitude,
            long:pharmacy.longitude}}
             height={20}
            />
                
             </div>
            </div>
        </div>
      
    </>
  )
}

export default DetailPharmacy