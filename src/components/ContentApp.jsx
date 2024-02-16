import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { CiLogout } from "react-icons/ci";
import Media from './Media';
import PostInput from './PostInput';
import OtherUser from './OtherUser';

const ContentApp = () => {

  const {user,setUser} = useContext(AppContext);
  console.log(user);
  //console.log("user is =>>>", user?.name);
  // const [showProfile, setShowProfile] = useState(false);

  // when logout then clear localstorage 
 const handleLogout=()=>{
    localStorage.clear();
    setUser(null);
 }

//  function showProfileHandler(){
//     setShowProfile(true);
//  }
 

  return (
    <div className=' bg-neutral-700 h-[100vh] w-[100vw] max-md:overflow-y-scroll '>

        

      <div className='flex justify-center p-5 text-4xl text-slate-300 font-mono font-bold italic relative'>
        <h1>cOnTeNt-MeDiA</h1>
      </div>

      <div className='w-full flex justify-between max-md:flex-col max-md:justify-center max-md:gap-10'>
        <div className='flex flex-col w-[27%] max-xl:w-[33%] max-lg:w-[37%] max-md:w-full max-md:pr-10 '>
          <div className='py-5 pl-28 flex items-center flex-col gap-5'>
            <div className=' '>
              <img src={user?.profile} alt='' className=' h-48 w-48 rounded-full max-lg:h-40 max-lg:w-40'/>
            </div>
            <div className='text-slate-300 text-3xl capitalize flex gap-5 items-center'>
              {user?.name}
              <button onClick={handleLogout}><CiLogout/></button>
            </div>
          </div>

          <OtherUser/>
        </div>

        <div className='flex flex-col h-[100vh] w-[70%] max-xl:w-[65%] max-lg:w-[62%] max-md:w-full max-md:pr-10 max-md:pl-5 pr-12 max-lg:pr-3'>
           <div className=' backgroung rounded-lg overflow-y-scroll h-[75%]'>
             <Media/>
           </div>
          <PostInput token={user?.token}/>
        </div>

      
      </div>

    </div>
  )
}

export default ContentApp;
