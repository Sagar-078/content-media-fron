import React, { useContext, useEffect, useState } from 'react'
import { FcLike } from "react-icons/fc";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
const OtherUser = () => {
    const {user}=useContext(AppContext);
    const [otherUser, setOtherUser] = useState([]);

    const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
      };

    const getOtherUsers=async()=>{
        try{
         const {data:{otherUsers}}= await axios.get("https://content-media.onrender.com/api/v1/content-media/getAllUsers",config);
         console.log("other users are =>>>",otherUsers);
         setOtherUser(otherUsers);
        }catch(err){
          console.log("err while get other users =>>>", err);
        }
    }
    useEffect(()=>{
        getOtherUsers();
    },[])
  return (
    <div className='pl-7'>
          <div className='backgroung pl-7 pt-5 rounded-lg'>
            
            <div className='flex p-3 items-center gap-3'>
              <h1 className='text-xl italic text-white'>Other users</h1>
              <FcLike  size={30}/>
            </div>
            
            <div className='  h-[430px] overflow-y-scroll'>

              {
                otherUser.map((userother, index) => {
                  return(
                    <div className='flex flex-col gap-1 p-2 pr-8 pb-4' key={userother._id}>
                      <div className='backgroung p-3 rounded-lg'>
                        <div className='flex items-baseline gap-2'>
                          <div>
                            <img src={userother.profile} alt='' height={30} width={30} className=' rounded-full'/>
                          </div>
                          <div className=' text-gray-400 font-mono font-bold'>
                            {userother.name}
                          </div>
                        </div>

                        <div className=' pl-7 text-gray-500 italic '>
                          {userother.email}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              
            </div>
          </div>
        </div>
  )
}

export default OtherUser