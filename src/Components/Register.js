import axios from 'axios';
import React, { useState } from 'react'
import swal from "sweetalert2";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  
    const [registerInput,setRegisterInput] = useState({
        email:'',
        pass:'',
        first_name:'',
        last_name:'',
        confirm:''
    })

    const handleRegister = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    }

    

    const register = async () => {
        if ( registerInput.last_name == "" ||
            registerInput.first_name == "" ||
            registerInput.email == "" ||
            registerInput.pass == "" ||
            registerInput.confirm == ""
        ) {
          swal.fire("Invalid !!", "Please provide all inputs", "warning");
        } 
        else if(registerInput.pass != registerInput.confirm )
        {
          swal.fire("Invalid !!", "Password doesnt match", "warning");
        }
        else {
          
            const data = {
              email: registerInput.email,
              password: registerInput.pass,
              first_name: registerInput.first_name,
              last_name:registerInput.last_name
            };
    
            console.log(
              "🚀 ~ file: Userregister.jsx:129 ~ Userregister ~ Userregister:",
              data
            );
            try {
              const response = await axios.post(
                "http://localhost:8080/api/v1/auth/register",
                data
              );
              swal.fire("Your account has been created", "", "success");
              navigate("/login");
            } catch (error) {
              swal.fire("Echec !!", "Invalid credantials", "warning");
              console.error(error);
            }
          
        }
      };
  return (
    <div className='h-screen flex items-center '>

       <div className="flex flex-col space-y-5 items-center justify-center w-1/2 h-screen bg-main text-white relative">
        <img src="/auth.png" className="absolute opacity-30 w-[80%]" />
            <h1 className='text-7xl  font-alfa'>HELLO !</h1>
            <p className='text-sm font-mogra'>Welcome to pharmacy locator! We're glad you're here</p>
      </div>

      <div className='flex flex-col  items-center justify-center w-1/2 h-screen bg-white relative space-y-6'>
      <Link to="/"
        className='z-10'
        >
        <div className=' flex items-center space-x-1 bg-main text-white rounded py-2 px-3 text-xs absolute right-2 top-2'>
            <span>Explore Pharmacies</span>
            <i class='bx bx-home-alt-2'></i>
        </div>
        </Link>
      <img src="/authP.png" className="absolute opacity-20 object-cover h-screen z-0" />
        <h1 className='text-6xl  font-alfa text-main z-20 pb-3'>Register</h1>
        <div className='grid gap-5 grid-cols-2'>
        <div className="flex items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10 ">
            <input
            name="first_name"
            value={registerInput.first_name}
            onChange={handleRegister}
            placeholder="User First Name"
            type="text"
            className=" text-sm w-full pl-3 outline-none text-gray-600"
          />
          <img src="/man.png" className=" w-5" />
        </div>

         <div className="flex items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10 ">
              <input
              name="last_name"
              value={registerInput.last_name}
              onChange={handleRegister}
              placeholder="User Last Name"
              type="text"
              className=" text-sm w-full pl-3 outline-none text-gray-600"
            />
          <img src="/man.png" className=" w-5" />
        </div>
        <div className="flex items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10 ">
          
              <input
              name="email"
              value={registerInput.email}
              onChange={handleRegister}
              placeholder="User email"
              type="email"
              className=" text-sm w-full pl-3 outline-none text-gray-600"
            />
          <img src="/email.png" className=" w-5" />
        </div>
       

        <div className="flex  items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10">
        <input
        name="pass"
        value={registerInput.pass}
        onChange={handleRegister}
        placeholder="User password"
        type="password"
        className=" text-sm w-full pl-3 outline-none text-gray-600"
      />
        <img src="/lock.png" className=" w-5" />
        </div>

        <div className="flex col-span-2 items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10">
        
            <input
              name="confirm"
              value={registerInput.confirm}
              onChange={handleRegister}
              placeholder="Confirm password"
              type="password"
              className=" text-sm w-full pl-3 outline-none text-gray-600"
            />
        <img src="/lock.png" className=" w-5" />
        </div>
     

      <button onClick={register} className="bg-main col-span-2 text-white rounded py-2 px-5  z-20 font-poppins">
      Sign up
      </button>

        </div>
      <Link to="/login" className='z-20'>
          <p className="text-main text-xs font-righteous z-100 underline underline-offset-4">Already have an account! Sign in</p>
      </Link>

      <div className="flex items-center z-20 space-x-1 font-mogra text-main absolute bottom-3 text-sm">
        <p>This app was screated by</p>
        <i class='bx bxl-github text-lg'></i>
        <a href="https://github.com/AlaouiMohamedDev">@AlaouiMohamedDev</a>
      </div>
      </div>

    </div>
  )
}

export default Register