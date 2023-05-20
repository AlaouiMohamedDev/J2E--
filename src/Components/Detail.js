import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Destinations from './Map/Destinations';

function Detail() {

    const location = useLocation();

    const pathname = location.pathname;
    const id = pathname.split('/detail/')[1];

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
    <div className=" ml-[400px] flex flex-col py-10 space-y-5">
       <div className=' bg-white $rounded shadow flex flex-col'>
        <div className="flex ">
             <img scr={pharmacy.image} className='w-1/2 h-[200px] object-cover' />
            <div className='flex flex-col'>
                <p>{pharmacy.nom}</p>
                <p>{pharmacy.adresse}</p>
            </div>


            

        </div>
        <Destinations field={{
            lat:pharmacy.latitude,
            long:pharmacy.longitude}}/>
       </div>
    </div>
  )
}

export default Detail