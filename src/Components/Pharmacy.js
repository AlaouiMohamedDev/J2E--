import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select'

function Pharmacy() {
    const [cities, setCities] = useState([]);

const [zones, setZones] = useState([]);

const [zonesAll, setAllZones] = useState([]);

const [pharmacies, setPharmacies] = useState([]);

// Fonction pour récupérer la liste des cities depuis le backend 
const fetchPharmacies = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/pharmacies');
        console.log(response.data)
        setPharmacies(response.data);
    } catch (error) {
        console.error(error);
    }
};

const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/villes');
      const citiesData = response.data.map(city => ({
        value: city.id,
        label: city.nom.toLowerCase()
      }));
      citiesData.unshift({ value: 0, label: 'all' });
      setCities(citiesData);
      console.log("citiesData",citiesData)
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchZones = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/zones');
      const zonesData = response.data.map(zone => ({
        value: zone.id,
        label: zone.nom.toLowerCase(),
        city: zone.ville.id
      }));
      zonesData.unshift({ value: 0, label: 'all' });

      setZones(zonesData);
      setAllZones(zonesData)
      console.log("zonesData",zonesData)
    } catch (error) {
      console.error(error);
    }
  };
  

useEffect(()=>{
    fetchCities();
    fetchZones();
    fetchPharmacies();
  },[])

  const [zone,setZone] = useState({ value: 0, label: 'all' })
  
const handlerZone = (e) =>{
  setZone(e)
  console.log(zone)
}

const [city,setCity] = useState({ value: 0, label: 'all' })

const handlerCity = (e) => {
    setCity(e);
    try {
      let filteredZones = zonesAll.filter(zone => {
        if (e.value === 0) {
          return true; // Include all zones
        }
        return zone.city === e.value;
      });
  
      // Check if the "all" option already exists
      const allOptionIndex = filteredZones.findIndex(zone => zone.value === 0);
  
      if (allOptionIndex === -1) {
        // Add the "all" option if it doesn't exist
        filteredZones.unshift({ value: 0, label: 'all' });
      } else {
        // Replace the existing "all" option with the latest one
        filteredZones[allOptionIndex] = { value: 0, label: 'all' };
      }
  
      setZones(filteredZones);
      setZone({ value: 0, label: 'all' })
    } catch (error) {
      console.error(error);
    }
  };
const customStyles = {
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      outline: "none",
      border: "solid 1px #E5E7EB",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
      color: "#ffffff",
      fontSize: "12px",
      padding: "0px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#03C988", // replace with your desired color
    }),
    container: (provided) => ({
      ...provided,
      width: "100%", // replace with your desired width
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px", // replace with your desired font size
      backgroundColor: state.isSelected ? "#03C988" : "white", // replace with your desired color
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        color: "black",
        fontSize: "12px",
      };
      
    },
  };


  const [search,setSearch] = useState("")

  const handler =(e)=>{
    e.persist()
    setSearch(e.target.value)
  }

  return (
    <div className=" ml-[400px] flex flex-col space-y-5">
        <h1>List Pharmacies</h1>
        <input
          type="text"
          name="search" value={search} onChange={handler}
          className="outline-none border py-2 text-xs rounded px-3 placeholder:text-gray-400"
          placeholder="Search for Pharmacies"
        />
        <Select
              options={cities}
              styles={customStyles}
              placeholder="Choose a city"
              value={city}
              onChange={handlerCity}
            />
            <Select
              options={zones}
              styles={customStyles}
              placeholder="Choose a Zone"
              value={zone}
              onChange={handlerZone}
            />

        <div className="grid grid-cols-5 gap-5">

            {
                pharmacies.filter(val =>{
                    console.log(val)
                    if(city.value==0)
                    {
                        if(zone.value == 0 && search =="")
                        {
                            return val;
                        }
                        else if(zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()))
                        {
                            return val;
                        }
                        else if(zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()))
                        {
                            return val
                        }
                    }
                    else
                    {
                        if(city.value ==val.zone.ville.id && zone.value == 0 && search =="")
                        {
                            return val;
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 &&  val.nom.toLowerCase().includes(search.toLowerCase()))
                        {
                            return val;
                        }
                        else if( zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()))
                        {
                            return val
                        }
                    }
                    }).map(phr=>(

                <div className='flex flex-col  bg-white rounded'>
                    <img src={phr.image}
                    className='h-[200px] object-cover' />
                    <div className='flex flex-col justify-between space-y-3 px-5 py-2 h-full'>
                        <h1 className='font-bold'>{phr.nom}</h1>
                        <p>{phr.adresse}</p>
                        <Link 
                                to={{pathname: `/detail/${phr.id}`}} 
                            >
            <button className='bg-main rounded text-white py-2'>
                            See Details
                        </button>
          </Link>
                        
                    </div>

                </div>
                ))
            }
        </div>
    </div>
  )
}

export default Pharmacy