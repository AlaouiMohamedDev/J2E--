import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Map from './Map/Map';
import axios from 'axios';
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';




function Home() {

  const navigate = useNavigate();

  const [pharmacyInput,setPharmacy] = useState({
    name:'',
    address:''
  })

  const [pharmacyInputEdit,setPharmacyEdit] = useState({
    name:'',
    address:''
  })
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

  const handlepharmacy =(e) =>{
    e.persist();
    setPharmacy({...pharmacyInput,[e.target.name]:e.target.value});
}

const handlepharmacyEdit =(e) =>{
  e.persist();
  setPharmacyEdit({...pharmacyInputEdit,[e.target.name]:e.target.value});
}




  const [latlng, setLatLng] = useState({});

  function handleChildValue(newValue) {
    setLatLng(newValue);
  }

  const [latlngEdit, setLatLngEdit] = useState({});

  function handleChildValueEdit(newValue) {
    setLatLngEdit(newValue);
  }
  const addPharmacy = async () => {
     
    if(pharmacyInput.name == "" || pharmacyInput.address == "" || zone == null || imageSrc == null || latlng == null)
    {
      swal.fire("Invalid !!","Please provide all inputs","warning");
    }
    else{
          if(imageSrc != null){
            const body = new FormData();
            // console.log("file", image)
            body.append("file", imageSrc);  
            body.append("upload_preset","my-uploads")
            const response = await fetch('https://api.cloudinary.com/v1_1/kritirank/image/upload', {
            method: "POST",
            body:body
          }).then(
            r=>r.json()
            );
            const data ={
              adresse:pharmacyInput.address,
              latitude:latlng.lat,
              longitude:latlng.lng,
              nom:pharmacyInput.name,
              image:response.secure_url,
              utilisateur:{id:1},
              zone:{id:zone.value},
            }
      
        console.log("🚀 ~ file: AddComplex.jsx:129 ~ addPharmacy ~ data:", data)
        try {
          const response = await axios.post('http://localhost:8080/api/pharmacies/save', data);
          console.log(response)
          swal.fire("Pahramcy addes","","success");
          setImageSrc(null)
        } catch (error) {
          swal.fire("Echec !!","Pharmacy not added","warning");
            console.error(error);
        }
      
      
      }
        
    }


};

const editPharmacy = async () => {
     
  if(pharmacyInputEdit.name == "" || pharmacyInputEdit.address == "" || zoneEdit == null || imageSrcEdit == null || latlngEdit == null)
  {
    swal.fire("Invalid !!","Please provide all inputs","warning");
  }
  else{
        if(imageSrcEdit != null){
          const body = new FormData();
          // console.log("file", image)
          body.append("file", imageSrcEdit);  
          body.append("upload_preset","my-uploads")
          const response = await fetch('https://api.cloudinary.com/v1_1/kritirank/image/upload', {
          method: "POST",
          body:body
        }).then(
          r=>r.json()
          );
          const data ={
            id:phrId,
            adresse:pharmacyInputEdit.address,
            latitude:latlngEdit.lat,
            longitude:latlngEdit.lng,
            nom:pharmacyInputEdit.name,
            image:response.secure_url,
            utilisateur:{id:1},
            zone:{id:zoneEdit.value},
          }
          
    
      console.log("🚀 ~ file: EditComplex.jsx:158 ~ editPharmacy ~ data:", data)
      try {
        const response = await axios.post('http://localhost:8080/api/pharmacies/update', data);
        console.log(response)
        swal.fire("Pahramcy updated","","success");
        fetchPharmacies();
        navigate('')
        closeModal();
        setImageSrcEdit(null)
      } catch (error) {
        swal.fire("Echec !!","Pharmacy not added","warning");
          console.error(error);
      }
    
    
    }
      
  }


};



const [cities, setCities] = useState([]);

const [zones, setZones] = useState([]);

const [zonesAll, setAllZones] = useState([]);







useEffect(()=>{
  fetchCities();
  fetchZones();
  fetchPharmacies();
},[])


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

    setZones(zonesData);
    setAllZones(zonesData)
    console.log("zonesData",zonesData)
  } catch (error) {
    console.error(error);
  }
};

const [city,setCity] = useState(cities[0])

const handlerCity = (e) => {
  setCity(e);
  try {
    setZones(zonesAll.filter(zone => {
      return zone.city === e.value;
    }));
  } catch(error) {
    console.error(error);
  }
};

const [cityEdit,setCityEdit] = useState(cities[0])

const handlerCityEdit = (e) => {
  setCityEdit(e);
  try {
    setZones(zonesAll.filter(zone => {
      return zone.city === e.value;
    }));
  } catch(error) {
    console.error(error);
  }
};






const [zone,setZone] = useState(zones[0])
  
const handlerZone = (e) =>{
  setZone(e)
  console.log(zone)
}

const [zoneEdit,setZoneEdit] = useState(zones[0])
  
const handlerZoneEdit = (e) =>{
  setZoneEdit(e)
}


const [imageSrc, setImageSrc] = useState();
const [imageSrcField, setImageSrcField] = useState();
const [uploadData, setUploadData] = useState();

const [imageSrcEdit, setImageSrcEdit] = useState();
const [uploadDataEdit, setUploadDataEdit] = useState();




function handleOnChange(changeEvent) {
  const reader = new FileReader();

  reader.onload = function(onLoadEvent) {
    setImageSrc(onLoadEvent.target.result);
    setUploadData(undefined);
  }

  reader.readAsDataURL(changeEvent.target.files[0]);
}

function handleOnChangeEdit(changeEvent) {
  const reader = new FileReader();

  reader.onload = function(onLoadEvent) {
    setImageSrcEdit(onLoadEvent.target.result);
    setUploadDataEdit(undefined);
  }

  reader.readAsDataURL(changeEvent.target.files[0]);
}




const closeModal = () => {
  const modal=document.querySelector('.editModal')
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  modal.classList.remove('right-0');
  modal.classList.add('-right-full');
};

const [phrId,setPhrId] = useState(0)
const showModal = (id,nom,zone,adresse,image,lat,long) => {
  setPhrId(id)
  setImageSrcEdit(image)
  setZoneEdit({value:zone.id,label:zone.nom.toLowerCase()})
  setPharmacyEdit({
    name: nom,
    address:adresse
  });
  setLatLngEdit({
    lat:lat,
    lng:long
  })
  const modal=document.querySelector('.editModal')
  modal.classList.add('flex');
  modal.classList.remove('hidden');
  modal.classList.add('right-0');
  modal.classList.remove('-right-full');

};

const deletePharmacy = async (id) => {
  swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
          try {
              await axios.delete(`http://localhost:8080/api/pharmacies/delete/${id}`);
              const updatedPharmacies = pharmacies.filter((phr) => phr.id !== id);
              setPharmacies(updatedPharmacies);
              fetchPharmacies();
              swal.fire(
                  'Deleted!',
                  'Your pharamcy has been deleted.',
                  'success'
                )
          } catch (error) {
              console.error(error);
          }
      }
    })
};




  return (
    <div className=' ml-[400px] flex flex-col py-10 space-y-5'>

<div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold text-center py-5'>Pharcmy</h1>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-main">
                        <tr className='grid grid-cols-4'>
                            <th scope="col" class="px-6 py-3">
                                #Num
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pharmacies.map((phr, index) => (
                            <tr key={phr.id} className='bg-white border-b grid grid-cols-4' >
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</th>
                                <td className='px-6 py-4 text-black'>{phr.nom}</td>
                                <td className='px-6 py-4 text-black'>
                                    <img src={phr.image} className='w-[40px] h-[40px] rounded-full object-cover' />
                                </td>
                                <td className='px-6 py-4 flex items-center space-x-2'>
                                    <i onClick={()=>showModal(phr.id,phr.nom,phr.zone,phr.adresse,phr.image,phr.latitude,phr.longitude)} className='bx bx-edit-alt bg-[#FFB30D] text-white p-2 rounded cursor-pointer' ></i>
                                    <i onClick={()=>deletePharmacy(phr.id)} className='bx bx-trash-alt bg-red-700 text-white p-2 rounded cursor-pointer' ></i>
                                </td>
                            </tr>
                        ))}
                         {pharmacies.length == 0 && 
                            <tr className="grid grid-cols-4">
                                <td className="col-span-3 py-3 flex items-center justify-center font-bold bg-Cblue text-white">
                                    No zones for the moments
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="items-center justify-center w-screen h-screen editModal z-100 hidden  top-0 fixed">

                <div className=' bg-white shadow-lg rounded px-5'>
                        <div className=' grid grid-cols-2 gap-5  space-y-2 w-full  items-center justify-start relative'>
                                <i onClick={closeModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                                <h1 className='text-lg font-semibold col-span-2'>Edit Pharamcy</h1>
                                <Select
                  options={cities}
                  styles={customStyles}
                  placeholder="Choose a city"
                  value={cityEdit}
                  onChange={handlerCityEdit}
                />
                <Select
                  options={zones}
                  styles={customStyles}
                  placeholder="Choose a Zone"
                  value={zoneEdit}
                  onChange={handlerZoneEdit}
                />
          <input name="name" value={pharmacyInputEdit.name} onChange={handlepharmacyEdit} placeholder = "Pharamcy name" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600 w-full" />
          <input name="address" value={pharmacyInputEdit.address} onChange={handlepharmacyEdit} placeholder = "Pharamcy address" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600 w-full" />

                    <div className=" flex  items-center justify-center">
                                <label for="dropzone-file1" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> your Complexe image</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input name='file1' id="dropzone-file1" type="file" className="hidden" onChange={handleOnChangeEdit} />
                                </label>
                    </div> 
                    <div className="w-1/2">
                      <div className="h-64 w-full flex items-center justify-center border border-gray-100 rounded">
                        {imageSrcEdit == null ? 
                            <img src="./images/inputFile.jpg" className='rounded object-cover w-full h-full opacity-25'/> 
                        : 
                        <img src={imageSrcEdit} className='rounded object-cover h-full w-full'/>
                        } 
                      </div>

                    </div>

          <Map onValueChange={handleChildValueEdit} height={20}/>

          <button onClick={editPharmacy} className="bg-main text-white py-2">
              Edit
          </button>
                        </div>
                </div>


            </div>


      <h1 className='text-4xl font-bold'>ADD PAHRMACIE</h1>
      
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
      <input name="name" value={pharmacyInput.name} onChange={handlepharmacy} placeholder = "Pharamcy name" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />
      <input name="address" value={pharmacyInput.address} onChange={handlepharmacy} placeholder = "Pharamcy address" type="text" className = "focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600" />


            <div className="col-span-2 md:col-span-1 flex  items-center justify-center ">
                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> your Complexe image</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input name='file' id="dropzone-file" type="file" className="hidden" onChange={handleOnChange} />
                        </label>
                    </div> 
                    <div className="col-span-2 md:col-span-1">
                      <div className="h-64 w-full flex items-center justify-center border border-gray-100 rounded">
                        {imageSrc == null ? 
                            <img src="inputFile.jpg" className='rounded object-cover w-full h-full opacity-25'/> 
                        : 
                        <img src={imageSrc} className='rounded object-cover h-full w-full'/>
                        } 
                      </div>

                    </div>

      <Map onValueChange={handleChildValue} />

      <button onClick={addPharmacy} className="bg-main text-white py-2">
          Add
      </button>
    </div>
  )
}

export default Home
