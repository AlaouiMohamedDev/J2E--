import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import SideHeader from './SideHeader';

const City = () => {
    // État pour stocker la liste des cities 
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState('');
    const [cityNameEdit,setCityNameEdit] = useState('')
    const [cityIdEdit,setCityIdEdit] = useState('')

    // Fonction pour récupérer la liste des cities depuis le backend 
    const fetchCities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/villes');
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const addCity = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/villes/save', { nom: cityName });
            setCities([...cities, response.data]);
            setCityName('');
            fetchCities()
            closeAddModal()
        } catch (error) {
            console.error(error);
        }
    };
    const updateCity = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/villes/update', {id: cityIdEdit, nom: cityNameEdit });
            const updatedCities = cities.map((city) => {
                if (city.id === response.data.id) {
                    return response.data;
                }
                return city;
            });
            setCities(updatedCities);
            setCityIdEdit('');
            setCityNameEdit('');
            fetchCities();
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteCity = async (id) => {
        Swal.fire({
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
                    await axios.delete(`http://localhost:8080/api/villes/delete/${id}`);
                    const updatedCities = cities.filter((city) => city.id !== id);
                    setCities(updatedCities);
                    fetchCities();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                } catch (error) {
                    console.error(error);
                }
            }
          })
    };
    const handlerAdd = (e) => {
        e.persist()
        setCityName(e.target.value);
    };
    const handlerEdit= (e) => {
        e.persist()
        setCityNameEdit(e.target.value);
    }
    useEffect(() => {
        fetchCities();
    }, []);

    const showModal = (id,nom) => {
        const modal=document.querySelector('.editModal')
        modal.classList.add('flex');
        modal.classList.remove('hidden');
        modal.classList.remove('-right-full');
        modal.classList.add('right-0');
        setCityIdEdit(id);
        setCityNameEdit(nom);
    };
    const closeModal = () => {
        const modal=document.querySelector('.editModal')
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        modal.classList.remove('right-0');
        modal.classList.add('-right-full');
    };

    const showAddModal = () => {
        const modal=document.querySelector('.addModal')
        modal.classList.add('flex');
        modal.classList.add('right-0');
        modal.classList.remove('-right-full');
        modal.classList.remove('hidden');
    };
    const closeAddModal = () => {
        const modal=document.querySelector('.addModal')

        modal.classList.remove('right-0');
        modal.classList.add('-right-full');
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    };
    
    return (
        <>
        <SideHeader />
        <div className='flex flex-col space-y-5 relative font-poppins'>
            <img src="/authP.png" className="absolute opacity-20 object-cover w-full h-screen z-0" />
            <div className='flex items-center justify-between pl-[360px] pr-[20px] z-20 pt-10'>
                <div className='flex items-center space-x-2'>
                    <img src="/building.png" className='w-8' />
                         <h1 className='text-xl font-bold text-center py-5 text-Cred'>List of cities</h1>
                </div>
                <span onClick={showAddModal} className='bg-main text-white py-2 px-3 rounded text-sm shadow  cursor-pointer'>Add new City</span>
                {/* <div className='relative flex items-center'>
                    <input name='cityName' value={cityName} onChange={handlerAdd} type='text' placeholder='City Name' className='outline-none border rounded p-2 text-sm text-gray-600 w-[250px]' />
                    <span onClick={addCity} className='text-main text-sm absolute right-2 cursor-pointer'>Add</span>
                </div> */}
            </div>
            <div class="relative overflow-x-auto pl-[360px] pr-[20px] z-20 ">
                <table class="w-full text-sm text-left text-gray-500 shadow dark:text-gray-400 ">
                    <thead class="text-xs text-white uppercase bg-main ">
                        <tr className='grid grid-cols-3'>
                            <th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Manage
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {cities.map((city, index) => (
                            <tr key={city.id} className='bg-white border-b grid grid-cols-3'>
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</th>
                                <td className='px-6 py-4 text-black'>{city.nom}</td>
                                <td className='px-6 py-4 flex items-center space-x-2'>
                                    <span onClick={()=>showModal(city.id,city.nom)} className=' bg-[#DBF227] text-white p-2 rounded cursor-pointer text-xs' >Edit</span >
                                    <span  onClick={()=>deleteCity(city.id)} className=' bg-[#FF4858] text-white p-2 rounded cursor-pointer text-xs' >Delete</span >
                                    <Link to={"/zone?ville=" + city.id+"&name="+city.nom}>
                                        <div className='flex justify-center p-2 items-center text-white bg-Cblue2 cursor-pointer text-xs space-x-1 rounded'>
                                            <span>Zones</span>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                       {cities.length == 0 && 
                            <tr className="grid grid-cols-3">
                                <td className="col-span-3 py-3 flex items-center justify-center font-bold bg-Cblue text-white">
                                    No Cities for the moments
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
            <div className='editModal hidden items-start -right-full z-100   top-0 fixed bg-white h-screen w-[400px] shadow-lg rounded '>
                    <div className='flex flex-col space-y-7 w-full py-10 px-6 items-center justify-start relative'>
                            <i onClick={closeModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                            <h1 className='text-lg font-semibold'>Edit City</h1>
                            <input onChange={handlerEdit} name='cityNameEdit' value={cityNameEdit} type="text" placeholder='City Name' className="w-full border rounded outline-none py-2 px-3 text-sm placeholder:text-gray-600 "/>
                            <span onClick={updateCity} className="w-full text-white bg-main py-2 flex items-center justify-center cursor-pointer rounded ">Edit</span>
                    </div>
            </div>
            <div className='addModal hidden  items-start -right-full top-0 z-100  fixed bg-white h-screen w-[400px] shadow-lg rounded '>
                    <div className='flex flex-col space-y-7 w-full py-10 px-6 items-center justify-start relative'>
                            <i onClick={closeAddModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                            <h1 className='text-lg font-semibold'>Add new City</h1>
                            <input name='cityName' value={cityName} onChange={handlerAdd}   type="text" placeholder='Zone Name' className="w-full border rounded outline-none py-2 px-3 text-sm placeholder:text-gray-600 "/>
                            <span onClick={addCity} className="w-full text-white bg-main py-2 flex items-center justify-center cursor-pointer rounded ">Add</span>
                    </div>
            </div>
        </>
    );
};

export default City; 