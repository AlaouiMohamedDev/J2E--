import React, { useEffect, useState } from "react";
import Select from "react-select";
import Map from "./Map/Map";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Datepicker, Input, initTE } from "tw-elements";
import { useCookies } from "react-cookie";
import SideHeader from "./SideHeader";

function Pharmacy() {
  const navigate = useNavigate();

  const [cookies] = useCookies(["name"]);

  const [pharmacyInput, setPharmacy] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    initTE({ Datepicker, Input });
  }, []);

  const [pharmacyInputEdit, setPharmacyEdit] = useState({
    name: "",
    address: "",
  });
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

  const handlepharmacy = (e) => {
    e.persist();
    setPharmacy({ ...pharmacyInput, [e.target.name]: e.target.value });
  };

  const handlepharmacyEdit = (e) => {
    e.persist();
    setPharmacyEdit({ ...pharmacyInputEdit, [e.target.name]: e.target.value });
  };

  const [latlng, setLatLng] = useState({});

  function handleChildValue(newValue) {
    setLatLng(newValue);
  }

  const [latlngEdit, setLatLngEdit] = useState({});

  function handleChildValueEdit(newValue) {
    setLatLngEdit(newValue);
  }
  const addPharmacy = async () => {
    if (
      pharmacyInput.name == "" ||
      pharmacyInput.address == "" ||
      zone == null ||
      imageSrc == null ||
      latlng == null
    ) {
      swal.fire("Invalid !!", "Please provide all inputs", "warning");
    } else {
      if (imageSrc != null) {
        const body = new FormData();
        // console.log("file", image)
        body.append("file", imageSrc);
        body.append("upload_preset", "my-uploads");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/kritirank/image/upload",
          {
            method: "POST",
            body: body,
          }
        ).then((r) => r.json());
        const data = {
          adresse: pharmacyInput.address,
          latitude: latlng.lat,
          longitude: latlng.lng,
          nom: pharmacyInput.name,
          image: response.secure_url,
          user: { id: cookies.userId },
          zone: { id: zone.value },
        };

        console.log(
          "🚀 ~ file: AddComplex.jsx:129 ~ addPharmacy ~ data:",
          data
        );
        try {
          const response = await axios.post(
            "http://localhost:8080/api/pharmacies/save",
            data
          );
          console.log(response);
          swal.fire("Ajout avec succecer", "", "success");
          setImageSrc(null);
          fetchPharmacies();
          toggleAdd();
        } catch (error) {
          swal.fire("Echec !!", "Ajout échouer", "warning");
          console.error(error);
        }
      }
    }
  };

  const editPharmacy = async () => {
    if (
      pharmacyInputEdit.name == "" ||
      pharmacyInputEdit.address == "" ||
      zoneEdit == null ||
      imageSrcEdit == null ||
      latlngEdit == null
    ) {
      swal.fire("Invalid !!", "Please provide all inputs", "warning");
    } else {
      if (imageSrcEdit != null) {
        const body = new FormData();
        // console.log("file", image)
        body.append("file", imageSrcEdit);
        body.append("upload_preset", "my-uploads");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/kritirank/image/upload",
          {
            method: "POST",
            body: body,
          }
        ).then((r) => r.json());
        const data = {
          id: phrId,
          adresse: pharmacyInputEdit.address,
          latitude: latlngEdit.lat,
          longitude: latlngEdit.lng,
          nom: pharmacyInputEdit.name,
          image: response.secure_url,
          user: { id: cookies.userId },
          zone: { id: zoneEdit.value },
        };

        console.log(
          "🚀 ~ file: EditComplex.jsx:158 ~ editPharmacy ~ data:",
          data
        );
        try {
          const response = await axios.post(
            "http://localhost:8080/api/pharmacies/update",
            data
          );
          console.log(response);
          swal.fire("Pahramcy updated", "", "success");
          fetchPharmacies();
          navigate("");
          closeModal();
          setImageSrcEdit(null);
        } catch (error) {
          swal.fire("Echec !!", "Pharmacy not added", "warning");
          console.error(error);
        }
      }
    }
  };

  const [cities, setCities] = useState([]);

  const [zones, setZones] = useState([]);

  const [zonesAll, setAllZones] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchZones();
    fetchPharmacies();
  }, []);

  const [pharmacies, setPharmacies] = useState([]);

  // Fonction pour récupérer la liste des cities depuis le backend
  const fetchPharmacies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/pharmacies");
      console.log(response.data);
      setPharmacies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/villes");
      const citiesData = response.data.map((city) => ({
        value: city.id,
        label: city.nom.toLowerCase(),
      }));

      setCities(citiesData);
      console.log("citiesData", citiesData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/zones");
      const zonesData = response.data.map((zone) => ({
        value: zone.id,
        label: zone.nom.toLowerCase(),
        city: zone.ville.id,
      }));

      setZones(zonesData);
      setAllZones(zonesData);
      console.log("zonesData", zonesData);
    } catch (error) {
      console.error(error);
    }
  };

  const [city, setCity] = useState(cities[0]);

  const handlerCity = (e) => {
    setCity(e);
    try {
      setZones(
        zonesAll.filter((zone) => {
          return zone.city === e.value;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [cityEdit, setCityEdit] = useState(cities[0]);

  const handlerCityEdit = (e) => {
    setCityEdit(e);
    try {
      setZones(
        zonesAll.filter((zone) => {
          return zone.city === e.value;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [zone, setZone] = useState(zones[0]);

  const handlerZone = (e) => {
    setZone(e);
    console.log(zone);
  };

  const [zoneEdit, setZoneEdit] = useState(zones[0]);

  const handlerZoneEdit = (e) => {
    setZoneEdit(e);
  };

  const [imageSrc, setImageSrc] = useState();
  const [imageSrcField, setImageSrcField] = useState();
  const [uploadData, setUploadData] = useState();

  const [imageSrcEdit, setImageSrcEdit] = useState();
  const [uploadDataEdit, setUploadDataEdit] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  function handleOnChangeEdit(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrcEdit(onLoadEvent.target.result);
      setUploadDataEdit(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const closeModal = () => {
    const modal = document.querySelector(".editModal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    modal.classList.remove("right-0");
    modal.classList.add("-right-full");
  };

  const gardecloseModal = () => {
    const modal = document.querySelector(".gardeModal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    modal.classList.remove("right-0");
    modal.classList.add("-right-full");
  };
  const [phrId, setPhrId] = useState(0);
  const showModal = (id, nom, zone, adresse, image, lat, long) => {
    setPhrId(id);
    setImageSrcEdit(image);
    setZoneEdit({ value: zone.id, label: zone.nom.toLowerCase() });
    setPharmacyEdit({
      name: nom,
      address: adresse,
    });
    setLatLngEdit({
      lat: lat,
      lng: long,
    });
    const modal = document.querySelector(".editModal");
    modal.classList.add("flex");
    modal.classList.remove("hidden");
    modal.classList.add("right-0");
    modal.classList.remove("-right-full");
  };

  const gradeshowModal = (id) => {
    setPhrId(id);
    const modal = document.querySelector(".gardeModal");
    modal.classList.add("flex");
    modal.classList.remove("hidden");
    modal.classList.add("right-0");
    modal.classList.remove("-right-full");
  };

  const deletePharmacy = async (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `http://localhost:8080/api/pharmacies/delete/${id}`
            );
            const updatedPharmacies = pharmacies.filter((phr) => phr.id !== id);
            setPharmacies(updatedPharmacies);
            fetchPharmacies();
            swal.fire("Deleted!", "Your pharamcy has been deleted.", "success");
          } catch (error) {
            console.error(error);
          }
        }
      });
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const [datepicker, setDatePicker] = useState(formattedDate);

  const handlerdate = (e) => {
    e.persist();
    setDatePicker(e.target.value);
  };

  const [datepickerEnd, setDatePickerEnd] = useState(formattedDate);

  const handlerdateEnd = (e) => {
    e.persist();
    console.log(e.target.value);
    setDatePickerEnd(e.target.value);
  };

  const dateFormatter = (date) => {
    const [day, month, year] = date.split("/");
    const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const selectedDate = new Date(isoDate);
    return selectedDate;
  };

  const formatDate = (dateString) => {
    const parts = dateString.split("/");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  };

  const addgarde = async () => {
    const dateStart = formatDate(document.querySelector(".dateStart").value);
    const dateEnd = formatDate(document.querySelector(".dateEnd").value);

    const data = {
      pk: {
        pharmacie: phrId,
        dateDebut: dateStart,
        garde: garde,
      },
      dateFin: dateEnd,
    };
    console.log("☠️☠️☠️ ----->", data);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/pharmacieGardeList/save",
        data
      );
      console.log(response);
      swal.fire("Garde ajouter avec succee", "", "success");
      navigate("");
      
    } catch (error) {
      swal.fire("Echec !!", "Garde echouer", "warning");
      console.error(error);
    }
  };

  const [garde, setGarde] = useState(1);

  const handleToggleGarde = () => {
    setGarde((prevGarde) => (prevGarde === 1 ? 2 : 1));
  };

  const toggleAdd = () => {
    const list = document.querySelector(".list");
    const add = document.querySelector(".add");

    const listP = document.querySelector(".listP");
    const addP = document.querySelector(".addP");

    list.classList.toggle("bg-main");
    list.classList.toggle("text-white");
    list.classList.toggle("bg-white");
    list.classList.toggle("text-Cred");

    add.classList.toggle("bg-main");
    add.classList.toggle("text-white");
    add.classList.toggle("bg-white");
    add.classList.toggle("text-Cred");

    listP.classList.toggle("hidden");
    addP.classList.toggle("hidden");
  };

  return (
    <>
      <SideHeader />
      <div className="flex flex-col space-y-5 relative font-poppins">
        <img
          src="/authP.png"
          className="absolute opacity-20 object-cover w-full h-screen z-0"
        />
        <div className="flex items-center space-x-2 pl-[360px] pr-[20px] z-20 pt-10">
          <img src="/drugstore.png" className="w-8" />
          <h1 className="text-xl font-bold text-center py-5 text-Cred">
            Manage Your Pharmacies
          </h1>
        </div>

        <div className="flex flex-col pl-[360px] pr-[20px] z-20">
          <div className="flex items-center border-b  w-max">
            <div
              onClick={toggleAdd}
              className="flex items-center  bg-main text-white py-3 rounded-tl-lg px-4 list"
            >
              <img src="/list.png" className="w-5" />
              <span className="font-semibold px-2">List</span>
            </div>
            <div
              onClick={toggleAdd}
              className="flex items-center  bg-white text-Cred py-3 rounded-tl-lg px-4 add"
            >
              <img src="/add-event.png" className="w-5" />
              <span className="font-semibold px-2">Add Pharmacy</span>
            </div>
          </div>
          <div className="bg-white rounded-b-lg rounded-lt-lg shadow py-5 px-3 listP">
            <h1 className="text-Cred pb-5 font-semibold text-sm ">
              List pharmacies
            </h1>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-main">
                  <tr className="grid grid-cols-3">
                    <th scope="col" class="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pharmacies

                    .filter((val) => {
                      console.log(
                        "my user val ----- ",
                        val.user.id,
                        "cookkiieee",
                        cookies.userId,
                        "texxxxt ",
                        val.user.id == cookies.userId
                      );
                      if (val.user.id == cookies.userId) {
                        return val;
                      }
                    })
                    .map((phr, index) => (
                      <tr
                        key={phr.id}
                        className="bg-white border-b grid grid-cols-3"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <img
                            src={phr.image}
                            className="w-[60px] h-[60px] rounded-lg object-cover"
                          />
                        </th>
                        <td className="px-6 py-4 text-black flex items-center ">
                          {phr.nom}
                        </td>
                        <td className="px-6 py-4 flex items-center space-x-2">
                          <span
                            onClick={() =>
                              showModal(
                                phr.id,
                                phr.nom,
                                phr.zone,
                                phr.adresse,
                                phr.image,
                                phr.latitude,
                                phr.longitude
                              )
                            }
                            className=" bg-[#DBF227] text-white p-2 rounded cursor-pointer text-xs"
                          >
                            Edit
                          </span>
                          <span
                            onClick={() => deletePharmacy(phr.id)}
                            className=" bg-[#FF4858] text-white p-2 rounded cursor-pointer text-xs"
                          >
                            Delete
                          </span>
                          <div
                            onClick={() => gradeshowModal(phr.id)}
                            className="bg-blue-600 text-white p-2 text-xs rounded cursor-pointer"
                          >
                            <span className="text-[12px]">Edit Garde</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {pharmacies.length == 0 && (
                    <tr className="grid grid-cols-3">
                      <td className="col-span-3 py-3 flex items-center justify-center font-bold bg-Cblue text-white">
                        No zones for the moments
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white hidden rounded-b-lg rounded-lt-lg shadow py-5 px-3 addP">
            <h1 className="text-Cred  font-semibold text-sm ">Add pharmacy</h1>
            <div className="grid grid-cols-2 gap-x-5">
              
              <div className="flex items-center text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/building.png" className="w-6" />
                <Select
                  options={cities}
                  styles={customStyles}
                  placeholder="Choose a city"
                  value={city}
                  onChange={handlerCity}
                />
              </div>
              <div className="flex items-center text-sm bg-gray-50/50 py-3 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/drugs.png" className="w-6 pr-1" />
                <input
                  name="name"
                  value={pharmacyInput.name}
                  onChange={handlepharmacy}
                  placeholder="Pharamcy name"
                  type="text"
                  className="outline-none bg-gray-50/50 placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center  text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/target.png" className="w-6" />
                <Select
                  options={zones}
                  styles={customStyles}
                  placeholder="Choose a Zone"
                  value={zone}
                  onChange={handlerZone}
                />
              </div>
              <div className="flex items-center text-sm bg-gray-50/50 py-3 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/drugs.png" className="w-6 pr-1" />
                <input
                  name="address"
                  value={pharmacyInput.address}
                  onChange={handlepharmacy}
                  placeholder="Pharamcy address"
                  type="text"
                  className="outline-none bg-gray-50/50 placeholder:text-gray-500"
                />
              </div>
              
              <div className="col-span-2 md:col-span-1 flex  items-center justify-center ">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      your Complexe image
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    name="file"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleOnChange}
                  />
                </label>
              </div>
              
              <Map onValueChange={handleChildValue}  />
              <button onClick={addPharmacy} className="bg-main text-white py-2 col-span-2 mt-5 w-2/3 rounded">
          Ajouter pharmacy
        </button>
            </div>
          </div>
        </div>

        
      </div>
      <div className="items-center justify-end w-screen h-screen editModal z-100 hidden right-0  top-0 fixed">
        <div className=" bg-white flex flex-col justify-center h-screen w-1/2 shadow-lg rounded px-5">
          <div className=" grid grid-cols-2 gap-5  space-y-2 w-full  items-center justify-start relative">
            <i
              onClick={closeModal}
              className="bx bx-x text-lg absolute top-2 right-2 cursor-pointer"
            ></i>
            <h1 className="text-lg font-semibold col-span-2 text-Cred">Edit Pharamcy</h1>
            <div className="flex items-center text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/building.png" className="w-6" />
                  <Select
                options={cities}
                styles={customStyles}
                placeholder="Choose a city"
                value={cityEdit}
                onChange={handlerCityEdit}
              />
              </div>
              <div className="flex items-center text-sm bg-gray-50/50 py-3 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/drugs.png" className="w-6 pr-1" />
                <input
                   name="name"
                   value={pharmacyInputEdit.name}
                   onChange={handlepharmacyEdit}
                   placeholder="Pharamcy name"
                   type="text"
                  className="outline-none bg-gray-50/50 placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center  text-sm bg-gray-50/50 py-1 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/target.png" className="w-6" />
                <Select
              options={zones}
              styles={customStyles}
              placeholder="Choose a Zone"
              value={zoneEdit}
              onChange={handlerZoneEdit}
            />
              </div>
              <div className="flex items-center text-sm bg-gray-50/50 py-3 px-3 border-[1px] rounded-tl-lg rounded-br-lg border-main my-5">
                <img src="/drugs.png" className="w-6 pr-1" />
                <input
                   name="address"
                   value={pharmacyInputEdit.address}
                   onChange={handlepharmacyEdit}
                   placeholder="Pharamcy address"
                   type="text"
                  className="outline-none bg-gray-50/50 placeholder:text-gray-500"
                />
              </div>
              <div className="col-span-2 md:col-span-1 flex  items-center justify-center ">
                <label
                  for="dropzone-file1"
                  className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> your
                      Complexe image
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    name="file1"
                    id="dropzone-file1"
                    type="file"
                    className="hidden"
                    onChange={handleOnChangeEdit}
                  />
                </label>
              </div>

            <Map onValueChange={handleChildValueEdit} width={100}/>

            <button onClick={editPharmacy} className="bg-main text-white py-2 rounded">
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="items-center justify-center w-screen h-screen gardeModal z-100 hidden  top-0 fixed">
        <div
          onClick={gardecloseModal}
          className="w-screen h-screen bg-black/50 absolute top-0 right-0 z-10"
        ></div>
        <div className=" bg-white shadow-lg rounded px-5 py-5 z-30 w-1/2">
          <div className=" grid grid-cols-2 gap-5  space-y-2 w-full  items-center justify-start relative">
            <i
              onClick={gardecloseModal}
              className="bx bx-x bg-red-500 text-white px-1 rounded text-lg absolute top-2 right-2 cursor-pointer"
            ></i>
            <div className="flex items-center space-x-2 col-span-2">
              <img src="/dn.png" className="w-8" />
              <h1 className="text-lg font-semibold text-Cred">
                Ajouter Une garde
              </h1>
            </div>

            <div
              className="relative mb-3 col-span-2"
              data-te-datepicker-init
              data-te-input-wrapper-init
            >
              <input
                type="text"
                name="datepicker"
                value={datepicker}
                onChange={handlerdate}
                className="py-2 px-4 dateStart peer block min-h-[auto] w-full rounded border-0 bg-transparent   leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Select a date"
              />
              <label
                for="floatingInput"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-Cred font-semibold transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Date Debut
              </label>
            </div>
            <div
              className="relative mb-3 col-span-2"
              data-te-datepicker-init
              data-te-input-wrapper-init
            >
              <input
                type="text"
                name="datepickerEnd"
                value={datepickerEnd}
                onChange={handlerdateEnd}
                className="py-2 px-4 dateEnd peer block min-h-[auto] w-full rounded border-0 bg-transparent leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Select a date"
              />
              <label
                for="floatingInput"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  text-Cred font-semibold transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Ended date
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/half-moon.png" className="w-8" />
              <input
                onClick={handleToggleGarde}
                class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchChecked"
              />
              <img src="/sun.png" className="w-8" />
            </div>

            <button
              onClick={addgarde}
              className="bg-main text-white py-2 rounded"
            >
              Ajouter une garde
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pharmacy;
