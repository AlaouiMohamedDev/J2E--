import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const Zone = () => {
 
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneNameEdit,setZoneNameEdit] = useState('')
    const [zoneIdEdit,setZoneIdEdit] = useState('')
    const location = useLocation();
    const ville_id = new URLSearchParams(location.search).get('ville');
    const ville_Name = new URLSearchParams(location.search).get('name');

    const fetchZones = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/villes/idVille/${ville_id}/zones`);
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const addZone = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/zones/save', { nom: zoneName , ville:{id:ville_id} });
            setZones([...zones, response.data]);
            setZoneName('');
            fetchZones()
            closeAddModal()
        } catch (error) {
            console.error(error);
        }
    };
    const updateZone = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/zones/update', {id: zoneIdEdit, nom: zoneNameEdit , ville:{id:ville_id} });
            const updatedZones = zones.map((zone) => {
                if (zone.id === response.data.id) {
                    return response.data;
                }
                return zone;
            });
            setZones(updatedZones);
            setZoneIdEdit('');
            setZoneNameEdit('');
            fetchZones();
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteZone = async (id) => {
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
                    await axios.delete(`http://localhost:8080/api/zones/delete/${id}`);
                    const updatedZones = zones.filter((zone) => zone.id !== id);
                    setZones(updatedZones);
                    fetchZones();
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
        setZoneName(e.target.value);
    };
    const handlerEdit= (e) => {
        e.persist()
        setZoneNameEdit(e.target.value);
    }
    useEffect(() => {
        fetchZones();
    });

    const showModal = (id,nom) => {
        const modal=document.querySelector('.editModal')
        modal.classList.add('flex');
        modal.classList.remove('hidden');
        modal.classList.add('right-0');
        modal.classList.remove('-right-full');
        setZoneIdEdit(id);
        setZoneNameEdit(nom);
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
    const closeModal = () => {
        const modal=document.querySelector('.editModal')
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        modal.classList.remove('right-0');
        modal.classList.add('-right-full');
    };
    
    return (
        <div className='py-10 px-7 ml-[400px]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold text-center py-5'><c className='text-main'>{ville_Name}</c> Zones</h1>
                <span onClick={showAddModal} className='bg-main text-white py-2 px-3 rounded text-sm  cursor-pointer'>Add new Zone</span>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-main">
                        <tr className='grid grid-cols-3'>
                            <th scope="col" class="px-6 py-3">
                                #Num
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
                        {zones.map((zone, index) => (
                            <tr key={zone.id} className='bg-white border-b grid grid-cols-3' >
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</th>
                                <td className='px-6 py-4 text-black'>{zone.nom}</td>
                                <td className='px-6 py-4 flex items-center space-x-2'>
                                    <i onClick={()=>showModal(zone.id,zone.nom)} className='bx bx-edit-alt bg-[#FFB30D] text-white p-2 rounded cursor-pointer' ></i>
                                    <i onClick={()=>deleteZone(zone.id)} className='bx bx-trash-alt bg-red-700 text-white p-2 rounded cursor-pointer' ></i>
                                </td>
                            </tr>
                        ))}
                         {zones.length == 0 && 
                            <tr className="grid grid-cols-3">
                                <td className="col-span-3 py-3 flex items-center justify-center font-bold bg-Cblue text-white">
                                    No zones for the moments
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='editModal hidden  items-start -right-full  top-0 fixed bg-white h-screen w-[400px] shadow-lg rounded '>
                    <div className='flex flex-col space-y-7 w-full py-10 px-6 items-center justify-start relative'>
                            <i onClick={closeModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                            <h1 className='text-lg font-semibold'>Edit Zone</h1>
                            <input onChange={handlerEdit} name='zoneNameEdit' value={zoneNameEdit} type="text" placeholder='Zone Name' className="w-full border rounded outline-none py-2 px-3 text-sm placeholder:text-gray-600 "/>
                            <span onClick={updateZone} className="w-full text-white bg-main py-2 flex items-center justify-center cursor-pointer rounded ">Edit</span>
                    </div>
            </div>

            <div className='addModal hidden  items-start -right-full  top-0 fixed bg-white h-screen w-[400px] shadow-lg rounded '>
                    <div className='flex flex-col space-y-7 w-full py-10 px-6 items-center justify-start relative'>
                            <i onClick={closeAddModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                            <h1 className='text-lg font-semibold'>Add new Zone</h1>
                            <input name='zoneName' value={zoneName} onChange={handlerAdd}   type="text" placeholder='Zone Name' className="w-full border rounded outline-none py-2 px-3 text-sm placeholder:text-gray-600 "/>
                            <span onClick={addZone} className="w-full text-white bg-main py-2 flex items-center justify-center cursor-pointer rounded ">Add</span>
                    </div>
            </div>
        </div>
    );
};

export default Zone; 
