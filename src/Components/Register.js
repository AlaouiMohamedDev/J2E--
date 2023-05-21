import axios from 'axios';
import React, { useState } from 'react'
import swal from "sweetalert2";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

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
    <div className='ml-[400px] flex flex-col py-10 items-center justify-center space-y-5'>
        <h1>register</h1>
        <input
        name="first_name"
        value={registerInput.first_name}
        onChange={handleRegister}
        placeholder="User First Name"
        type="text"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />
       <input
        name="last_name"
        value={registerInput.last_name}
        onChange={handleRegister}
        placeholder="User Last Name"
        type="text"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />
        <input
        name="email"
        value={registerInput.email}
        onChange={handleRegister}
        placeholder="User email"
        type="email"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />
      <input
        name="pass"
        value={registerInput.pass}
        onChange={handleRegister}
        placeholder="User password"
        type="password"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />

      <input
        name="confirm"
        value={registerInput.confirm}
        onChange={handleRegister}
        placeholder="Confirm password"
        type="password"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />

      <button onClick={register} className="bg-main text-white rounded py-2 px-5">
        Sign up
      </button>
    </div>
  )
}

export default Register