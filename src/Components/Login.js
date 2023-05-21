import axios from 'axios';
import React, { useState } from 'react'
import swal from "sweetalert2";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

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
              navigate('/pharmacy')
              window.location.reload();
            } catch (error) {
              swal.fire("Echec !!", "Invalid credantials", "warning");
              console.error(error);
            }
          
        }
      };
  return (
    <div className='ml-[400px] flex flex-col py-10 items-center justify-center space-y-5'>
        <h1>Login</h1>
        <input
        name="email"
        value={loginInput.email}
        onChange={handlelogin}
        placeholder="User email"
        type="email"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />
      <input
        name="pass"
        value={loginInput.pass}
        onChange={handlelogin}
        placeholder="User password"
        type="password"
        className="focus:border-main placeholder:text-xs text-sm p-2 border border-gray-100 outline-none text-gray-600"
      />

      <button onClick={Login} className="bg-main text-white rounded py-2 px-5">
        Log in
      </button>
    </div>
  )
}

export default Login