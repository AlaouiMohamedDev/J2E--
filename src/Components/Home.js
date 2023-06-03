import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select'
import SideHeader from './SideHeader';

function Home() {
    const [cities, setCities] = useState([]);

const [zones, setZones] = useState([]);

const [zonesAll, setAllZones] = useState([]);

const [pharmacies, setPharmacies] = useState([]);

// Fonction pour récupérer la liste des cities depuis le backend 
const fetchPharmacies = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/pharmacies/withgardes');
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
      borderRadius: "4px",
      backgroundColor: "none",
      color: "#ffffff",
      fontSize: "12px",
      padding: "0px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#721E23", // replace with your desired color
    }),
    container: (provided) => ({
      ...provided,
      width: "100%", // replace with your desired width
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px", // replace with your desired font size
      backgroundColor: state.isSelected ? "#721E23" : "white", // replace with your desired color
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


  const gardes = [
    {value:0 , label:'All'},
    {value:1 , label:'Nuit'},
    {value:2 , label:'Jour'}
  ];



  
const [garde,setGarde] = useState({ value: 0, label: 'all' })

const handlerGarde= (e) => {
    setGarde(e);
  };

  const toggleSearch = ()=>{
    const advanced = document.querySelector('.advanced')
    advanced.classList.toggle('hidden')
    advanced.classList.toggle('grid')
  }


  return (
    <>
    <SideHeader />
    <div className=" flex flex-col space-y-5 relative font-poppins">
      <img src="/authP.png" className="absolute opacity-20 object-cover w-full h-screen z-0" />
      <div className="flex flex-col space-y-5 pl-[360px] pr-[20px] z-20">
            <div className="flex items-center space-x-3">
              <img src="/drugstore.png" className="w-7" />
              <h1 className='font-bold text-Cred'>Find you nearest pharmacy</h1>
            </div>
            <div className="bg-white grid grid-cols-4 gap-x-7 shadow-lg rounded-md  px-4 z-10">
              <div className='flex items-center text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5'>
              <img src="/drugs.png" className="w-6 pr-1" />
              <input
                type="text"
                name="search" value={search} onChange={handler}
                className="outline-none bg-gray-50/50 placeholder:text-gray-500"
                placeholder="Pharmacy name"
              />
              </div>
              <div className='flex items-center text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5'>
                  <img src="/building.png" className="w-6" />
                  <Select
                  options={cities}
                  styles={customStyles}
                  placeholder="Choose a city"
                  value={city}
                  onChange={handlerCity}
                />
            </div>

            <div className=" w-full my-5 flex items-center justify-center">
            <button className="bg-main text-white flex items-center justify-center text-sm rounded space-x-1 py-3 px-7">
                  <i className='bx bx-search-alt'></i>
                  <span>Search</span>
            </button>

            </div>

            <button onClick={toggleSearch} className='text-gray-500 flex flex-col items-center justify-center space-y-1 border-l py-5'>
                  <span className='text-xs '>Advanced search</span>
                  <i className='bx  text-main bxs-chevrons-down'></i>
            </button>

            <div className='col-span-4 hidden grid-cols-3 gap-7 border-t advanced'>
                    <div className='flex items-center text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5'>

                    <img src="/target.png" className="w-6" />
                      <Select
                        options={zones}
                        styles={customStyles}
                        placeholder="Choose a Zone"
                        value={zone}
                        onChange={handlerZone}
                      />
                      </div>
                      <div className='flex items-center text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5'>
                      <img src="/dn.png" className="w-6" />
                                  <Select
                          options={gardes}
                          styles={customStyles}
                          placeholder="Choose a garde"
                          value={garde}
                          onChange={handlerGarde}
                        />
                      </div>
                </div>
            </div>
       </div>

    <h1 className=' pl-[360px] font-bold text-Cred'>List of Pharmacies</h1>

      <div className='pl-[360px] pr-[20px] grid grid-cols-2 gap-7 z-10'>

      {
                pharmacies.filter(val =>{
                    console.log(val)
                    if(city.value==0)
                    {
                        if(zone.value == 0 && search =="" && garde.value ==0)
                        {
                            return val;
                        }
                        else if(zone.value == 0 && search =="" && garde.value == val.gardeId )
                        {
                            return val;
                        }
                        else if(zone.value == val.zone.id && search =="" && garde.value == 0 )
                        {
                            return val;
                        }
                        else if(zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0)
                        {
                            return val;
                        }
                        else if(zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId)
                        {
                            return val;
                        }
                        else if(zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0 )
                        {
                            return val
                        }
                        else if(zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId )
                        {
                            return val
                        }
                    }
                    else
                    {
                        if(city.value ==val.zone.ville.id && zone.value == 0 && search =="" && garde.value ==0)
                        {
                            return val;
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 && search =="" && garde.value == val.gardeId)
                        {
                            return val;
                        }
                        else if( zone.value == val.zone.id && search =="" && garde.value ==0)
                        {
                            return val
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 &&  val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0)
                        {
                            return val;
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 &&  val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId)
                        {
                            return val;
                        }
                        else if( zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0)
                        {
                            return val
                        }
                        else if( zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId)
                        {
                            return val
                        }
                    }
                    }).map(phr=>(
            <div className='flex  bg-white rounded shadow-lg relative'>
                      {
                        phr.gardeId == 2
                        &&
                        <div className='absolute top-2 left-2 flex items-center space-x-1 text-white p-1 rounded text-xs bg-yellow-400'>
                            <i class='bx bxs-sun' ></i>
                            <span>Day</span>
                        </div>
                      }
                      {
                        phr.gardeId == 1
                        &&
                        <div className='absolute top-2 left-2 flex items-center space-x-1 text-white p-1 rounded text-xs bg-blue-500'>
                            <i class='bx bxs-moon' ></i>
                            <span>Nuit</span>
                        </div>
                      }
                        <img src={phr.image} className='h-[230px] w-1/2 object-cover rounded-l' />
                        <div className='flex flex-col py-3 px-5 w-1/2 justify-between'>
                          <div className='flex flex-col space-y-1'>
                            <h1 className='font-semibold text-md'>{phr.nom}</h1>
                            <div className='flex items-center space-x-2 text-gray-400 '>
                              <i className='bx bxs-map-pin' ></i>
                              <span className='text-[12px]'>{phr.adresse}</span>
                            </div>

                          </div>
                          <div className='grid grid-cols-2 gap-3 text-black/60'>
                            <div className='flex items-center space-x-1'>
                                <i className='bx bx-run text-lg' ></i>
                                <span className='text-sm'>5 min</span>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <i className='bx bx-car text-lg' ></i>
                                <span className='text-sm'>10 min</span>
                            </div>

                            <div className='flex items-center space-x-1'>
                                <i className='bx bx-street-view text-lg' ></i>
                                <span className='text-sm'>10 km</span>
                            </div>

                            <div className='flex items-center space-x-1'>
                                <i className='bx bxs-star-half text-lg' ></i>
                                <span className='text-sm'>4.5 avis</span>
                            </div>
                            
                          </div>
                          <div className="border-t pt-5 pb-2 flex items-center justify-between">
                            <span className='font-semibold text-[13px]'>200,000 v/m</span>
                            <Link 
                                to={{pathname: `/detailpharmacy/${phr.id}`}} 
                            >
                            <img src="/map.png" className="w-6" />
                            </Link>
                          </div>
                        </div>
                    </div>
                ))
            }
        
      </div>
        {/* <h1>List Pharmacies</h1>
       
       


        <div className="grid grid-cols-5 gap-5">

            {
                pharmacies.filter(val =>{
                    console.log(val)
                    if(city.value==0)
                    {
                        if(zone.value == 0 && search =="" && garde.value ==0)
                        {
                            return val;
                        }
                        else if(zone.value == 0 && search =="" && garde.value == val.gardeId )
                        {
                            return val;
                        }
                        else if(zone.value == val.zone.id && search =="" && garde.value == 0 )
                        {
                            return val;
                        }
                        else if(zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0)
                        {
                            return val;
                        }
                        else if(zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId)
                        {
                            return val;
                        }
                        else if(zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0 )
                        {
                            return val
                        }
                        else if(zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId )
                        {
                            return val
                        }
                    }
                    else
                    {
                        if(city.value ==val.zone.ville.id && zone.value == 0 && search =="" && garde.value ==0)
                        {
                            return val;
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 && search =="" && garde.value == val.gardeId)
                        {
                            return val;
                        }
                        else if( zone.value == val.zone.id && search =="" && garde.value ==0)
                        {
                            return val
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 &&  val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0)
                        {
                            return val;
                        }
                        else if(city.value ==val.zone.ville.id && zone.value == 0 &&  val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId)
                        {
                            return val;
                        }
                        else if( zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value ==0)
                        {
                            return val
                        }
                        else if( zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId)
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
        </div> */}
    </div>
    </>
  )
}

export default Home