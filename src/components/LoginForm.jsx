import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LoginForm = (Props) => {

    let setSign = Props.setSign;
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setUser} = useContext(AppContext);
    

    const submitHandler = async(e) => {
        e.preventDefault();
        if(!email || !password){
          toast.error("Please Fill all details !!")
          return;
        }
    
        try{
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const {data} = await axios.post("https://content-media.onrender.com/api/v1/content-media/user/login", {email, password}, config);
          console.log("data is =>",data);
          setUser(data);

          // save in local storage and give name myuser
          localStorage.setItem("myuser", JSON.stringify(data));
          toast.success("Logged in successfully");
    
        }catch(err){
          toast.error("Invalid Id & Password !!");
          console.log(err);
        }
    
    }

  return (
    <div className="bg-slate-400 w-[30%] max-lg:w-[38%] max-md:w-[50%] max-sm:w-[80%] flex justify-center items-center p-5 rounded-lg flex-col gap-8">
       <form className="w-full flex justify-center flex-col items-center gap-5" >
          <h1 className="text-white font-bold font-mono text-lg">Login</h1>
          <input type="email" onChange={(e) =>setEmail(e.target.value)} placeholder="mail id :" className="px-2 py-2 rounded backgroung placeholder:text-slate-200 border-none outline-none w-[70%]"/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password :" className="px-2 py-2 rounded backgroung placeholder:text-slate-200 border-none outline-none w-[70%]"/>
          <button className="bg-slate-800 text-white px-4 py-2 rounded font-bold" onClick={submitHandler} >Submit</button>
        </form>
        <div className="flex flex-row gap-7 items-baseline">
            <p className="font-semibold text-sm">Don't have account ?</p>
            <button className="text-white font-bold" onClick={() => {setSign(false)}}>Sign Up</button>
        </div> 
    </div>
  )
}

export default LoginForm