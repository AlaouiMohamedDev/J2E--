import React from 'react'
import { Link } from 'react-router-dom'

function SideHeader() {
  return (
    <div className="h-screen fixed bg-white w-1/4 2xl:w-1/5 shadows ">
        <div className="flex flex-col space-y-10 py-10 w-full  h-full relative">
            <div className="flex flex-col justify-center px-5  space-y-6">
                <h1 className="font-playfair text-center  text-3xl font-bold text-Cblue">Pharmacy <c className="text-main">Locator</c></h1>
                <p className=" text-justify font-playfair text-sm text-gray-500">Welcome to our Pharmacy Locator app! We are thrilled to offer you a user-friendly and convenient way to find pharmacies near you.</p>
            </div>
            <div className='flex flex-col text-md px-5  font-poppins'>
                <Link to="/">
                    <div className='flex items-center space-x-3 text-Cblue2 border-b py-3'>
                        <i className='bx bxs-home text-lg '></i>
                        <span className='font-bold'>Home</span>
                    </div>
                </Link>
                <Link to="/city">
                    <div className='flex items-center space-x-3 text-Cblue border-b py-3 hover:text-Cblue2 cursor-pointer duration-100 transition-all'>
                        <i className='bx bxs-city text-lg'></i>
                        <span className='font-bold'>Cities</span>
                    </div>
                </Link>
                <Link to="/pharmacy">
                    <div className='flex items-center space-x-3 text-Cblue border-b py-3 hover:text-Cblue2 cursor-pointer duration-100 transition-all'>
                        <i className='bx bx-plus-medical text-lg' ></i>
                        <span className='font-bold'>Pharmacies</span>
                    </div>
                </Link>
                <div className='flex items-center space-x-3 text-Cblue border-b py-3 hover:text-Cblue2 cursor-pointer duration-100 transition-all'>
                    <i className='bx bx-slider text-lg' ></i>
                    <span className='font-bold'>Services</span>
                </div>
                <div className='flex items-center space-x-3 text-Cblue border-b py-3 hover:text-Cblue2 cursor-pointer duration-100 transition-all'>
                    <i className='bx bxs-spreadsheet text-lg' ></i>
                    <span className='font-bold'>About Us</span>
                </div>
                <div className='flex items-center space-x-3 text-Cblue py-3 hover:text-Cblue2 cursor-pointer duration-100 transition-all'>
                     <i className='bx bx-mail-send text-lg' ></i>
                    <span className='font-bold'>Contact Us</span>
                </div>
            </div>
            <div className="flex items-center w-full justify-center space-x-5 absolute  bottom-5 text-gray-500 dark:text-gray-200">
                <i className="hover:text-Cblue2 delay-200 transition ease-in-out cursor-pointer bx bxl-facebook"></i>
                <i className="hover:text-Cblue2 delay-200 transition ease-in-out cursor-pointer bx bxl-twitter"></i>
                <i className="hover:text-Cblue2 delay-200 transition ease-in-out cursor-pointer bx bxl-linkedin"></i>
                <i className="hover:text-Cblue2 delay-200 transition ease-in-out cursor-pointer bx bxl-instagram-alt"></i>
            </div>
        </div>
    </div>
  )
}

export default SideHeader