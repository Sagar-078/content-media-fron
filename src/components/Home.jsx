import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoginForm from './LoginForm';

const Home = () => {

    const [sign, setSign] = useState(false);
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // for verify email pattern their is test method
    const isValid = emailPattern.test(email);


    const signUpHandler = async (e) => {
        e.preventDefault();
    
        // if input field's are empty then
        if(!name || !email || !password || !confirmPassword){
          toast.error("Please Fill all details !!")
          return;
        }
    
        // check mail id is valid 
        if(!isValid){
          toast.error("Please fill email Correctly");
          return;
        }
    
        // password and confirm password are metch 
        if(password !== confirmPassword){
          toast.error("Please set Password Correctly !!")
          return;
        }
    
        
        if(password.length < 5){
          toast.error("Please give a Strong password");
          return;
        }
    
        //if password is alrady exist in our db 
    
        console.log(name, email, password);
    
        try{
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const {data} = await axios.post("https://content-media.onrender.com/api/v1/content-media/user/signup", {name, email, password}, config);
          console.log("signupdata => ",data);
          
        //   localStorage.setItem("users", JSON.stringify(data));
          toast.success("Signed Up successfully");
    
          setSign(true);
        }catch(err){
          toast.error("This mail is taken !!");
          console.log(err);
        }
        
      }


  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw] '>
      <div className=' bg-gray-600 h-[100%] w-[100%]'>
        
        <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
          <div className='h-20 w-[30%] max-lg:w-[38%] max-md:w-[50%] max-sm:w-[80%] rounded-lg bg-slate-400 flex justify-center items-center'>
            <h1 className='font-mono font-bold text-white text-3xl max-sm:text-2xl'>cOnTeNt-MeDiA</h1>
          </div>

          {
            sign === false ? 
            (<div className=" bg-slate-400 w-[30%] max-lg:w-[38%] max-md:w-[50%] max-sm:w-[80%] flex justify-center items-center p-5 rounded-lg flex-col gap-8">
              <form onSubmit={signUpHandler} className="w-full flex justify-center flex-col items-center gap-5">
                <h1 className="text-white font-bold font-mono text-lg">Sign Up</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name :" className="px-2 py-2 rounded backgroung placeholder:text-slate-200 border-none outline-none w-[70%]"/>
                <input type="email" onChange={(e) => setMail(e.target.value)} placeholder="mail id :" className="px-2 py-2 rounded backgroung placeholder:text-slate-200 border-none outline-none w-[70%]"/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password :" className="px-2 py-2 rounded backgroung placeholder:text-slate-200 border-none outline-none w-[70%]"/>
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password :" className="px-2 py-2 rounded backgroung placeholder:text-slate-200 border-none outline-none w-[70%]"/>
                <button className=" bg-slate-800 text-white px-4 py-2 rounded font-bold" onSubmit={signUpHandler}>Submit</button>
              </form>
              <div className="flex flex-row gap-7 items-baseline">
                <p className="font-semibold text-sm">You have account ?</p>
                <button className="text-white font-bold" onClick={() => {setSign(true)}}>Login</button>
              </div> 
            </div>)  
            : 
            (<LoginForm sign={sign} setSign={setSign}/>)
          }

        </div>

      </div>
    </div>
  )
}

export default Home