import axios from 'axios';
import React, { useState } from 'react'
import swal from "sweetalert2";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [cookies,setCookie] = useCookies(['name']);

    const navigate = useNavigate()

    const [loginInput,setLoginInput] = useState({
        email:'',
        pass:''
    })

    const handlelogin = (e) => {
        e.persist();
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }

    const Login = async () => {
        if (
            loginInput.email == "" ||
            loginInput.pass == "" 
        ) {
          swal.fire("Invalid !!", "Please provide all inputs", "warning");
        } else {
          
            const data = {
              email: loginInput.email,
              password: loginInput.pass,
            };
    
            console.log(
              "🚀 ~ file: UserLogin.jsx:129 ~ UserLogin ~ UserLogin:",
              data
            );
            try {
              const response = await axios.post(
                "http://localhost:8080/api/v1/auth/authenticate",
                data
              );
              //console.log("🔐🔐🔐🔐🔐",response.data);
              setCookie('jwt',response.data)
              swal.fire("Bienvenu", "", "success");
              navigate('/')
              window.location.reload();
            } catch (error) {
              swal.fire("Echec !!", "Invalid credantials", "warning");
              console.error(error);
            }
          
        }
      };
  return (
    <div className='h-screen flex items-center overflow-hidden '>

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
        <h1 className='text-6xl  font-alfa text-main z-20 pb-3'>Login</h1>
        <div className="flex items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10 w-[40%] ">
            <input
            name="email"
            value={loginInput.email}
            onChange={handlelogin}
            placeholder="User email"
            type="email"
            className="pl-3 w-full text-sm  text-gray-600 outline-none"
          />
          <img src="/email.png" className=" w-5" />
        </div>

        <div className="flex items-center border-2 border-main rounded-tl-xl rounded-br-xl bg-white p-2 z-10 w-[40%]">
          <input
          name="pass"
          value={loginInput.pass}
          onChange={handlelogin}
          placeholder="User password"
          type="password"
          className=" text-sm pl-3 w-full outline-none text-gray-600"
        />
        <img src="/lock.png" className=" w-5" />
        </div>
     

      <button onClick={Login} className="bg-main text-white rounded py-2 px-5 w-[40%] z-20 font-poppins">
        Log in
      </button>
      <Link to="/register"  className='z-20'>
          <p className="text-main text-xs font-righteous  z-100 underline underline-offset-4">New here create an account! Sign up</p>
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

export default Login