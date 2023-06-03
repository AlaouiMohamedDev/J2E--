import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'

function SideHeader() {
    const [cookies,removeCookie] = useCookies(['name']);
    const navigate = useNavigate()

    const[jwt,setjwt] =useState(null)

    useEffect(()=>{
        if(cookies.jwt != "undefined")
        {
            setjwt(cookies.jwt)
        }
    },[cookies])

    const logout = ()=>{
        removeCookie('jwt')
        removeCookie('userId')
        removeCookie('first_name')
        removeCookie('last_name')
        window.location.reload();
        navigate("/pharmacy")
    }
  return (
    <>
    {
                    !jwt
                    &&
    <div className="bg-main text-white py-2 px-3 text-sm rounded-tl-lg shadow rounded-br-lg font-semibold flex items-center space-x-3 absolute right-5 top-3 z-50">
                 
                <Link to="/login">
                   <span className='hover:text-Cred'>Login</span>
                </Link>

                <Link to="/register">
                    <span className='hover:text-Cred'>register</span>
                </Link>
    </div>
}

    {
                     jwt
                     &&
                     <div onClick={logout} className='flex items-center bg-white shadow rounded-l-full pr-3 space-x-1 text-main cursor-pointer duration-100 transition-all absolute right-5 top-3 z-100'>
                            <img src='/user.png' className='w-10' />
                            <span className='text-xs font-semibold'>{cookies.first_name}</span>
                            <i class='bx bxs-door-open text-lg '></i>
                        </div>
                }
    <div className="h-screen fixed bg-main w-1/4 2xl:w-1/5 drop-shadow-lg z-30">
        <div className="flex flex-col space-y-10 py-10 w-full  h-full relative">
            <div className="flex flex-col justify-center px-5  space-y-6">
                <h1 className="font-playfair text-center  text-3xl font-bold text-white">Pharmacy <c className="text-Cred">Locator</c></h1>
                <p className=" text-center font-mogra text-xs text-Cred">Welcome to our Pharmacy Locator app! We are thrilled to offer you a user-friendly and convenient way to find pharmacies near you.</p>
            </div>
            <div className='flex flex-col text-md px-5  font-poppins'>
                <Link to="/">
                    <div className='flex items-center space-x-3 text-Cred border-b border-Cred py-3'>
                        <i className='text-Cred bx bxs-home text-lg '></i>
                        <span className='font-bold'>Home</span>
                    </div>
                </Link>
                <Link to="/city">
                    <div className='flex items-center space-x-3 text-Cred border-b border-Cred py-3 hover:text-white cursor-pointer duration-100 transition-all'>
                        <i className='text-Cred bx bxs-city text-lg'></i>
                        <span className='font-bold'>Cities</span>
                    </div>
                </Link>
                <Link to="/pharmacy">
                    <div className='flex items-center space-x-3 text-Cred border-b border-Cred py-3 hover:text-white cursor-pointer duration-100 transition-all'>
                        <i className='text-Cred bx bx-plus-medical text-lg' ></i>
                        <span className='font-bold'>Pharmacies</span>
                    </div>
                </Link>

                    <div className='flex items-center space-x-3 text-Cred border-b border-Cred   py-3 hover:text-white cursor-pointer duration-100 transition-all'>
                        <i className='text-Cred bx bxl-deezer text-lg' ></i>
                        <span className='font-bold'>Services</span>
                    </div>
                    <div className='flex items-center space-x-3 text-Cred  py-3 hover:text-white cursor-pointer duration-100 transition-all'>
                        <i className='text-Cred bx bx-headphone text-lg' ></i>
                        <span className='font-bold'>Contact us</span>
                    </div>
           

              
                
            </div>
            <div className="flex items-center w-full justify-center space-x-5 absolute  bottom-5 text-gray-500 dark:text-gray-200">
                <i className="text-Cred hover:text-white delay-200 transition ease-in-out cursor-pointer bx bxl-facebook"></i>
                <i className="text-Cred hover:text-white delay-200 transition ease-in-out cursor-pointer bx bxl-twitter"></i>
                <i className="text-Cred hover:text-white delay-200 transition ease-in-out cursor-pointer bx bxl-linkedin"></i>
                <i className="text-Cred hover:text-white delay-200 transition ease-in-out cursor-pointer bx bxl-instagram-alt"></i>
            </div>
        </div>
    </div>
    </>
  )
}

export default SideHeader