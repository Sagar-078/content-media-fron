import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { BsSendFill } from "react-icons/bs";
import { AppContext } from '../context/AppContext';

const PostInput = ({token}) => {
  const [typedContent, setTypedContent] = useState("");
  const {setAllPost}=useContext(AppContext);

  // for send post or create post
  const sendPostHandler = async() => {

    console.log("content is => => ",typedContent);

    if(typedContent.trim()==""){
      toast.error("Can not craete empty post")
      return;
    }
    const loadingtoast=toast.loading("Please wait.....");
    try{
       
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
      };

      const {data} = await axios.post('https://content-media.onrender.com/api/v1/content-media/user/post', 
      {content:typedContent},config);

      // if successfully post then show this content and with prev data
      if(data.success){
        setTypedContent("");
        toast.success("Post created successfully");
        setAllPost((prev)=>[data.contentData,...prev]);
      }

    }catch(err){

      console.log("err while creating post => ", err);
    
    }finally{

      toast.dismiss(loadingtoast);
    
    }

  }
  return (
    <div className='pt-5'>
            <div className='backgroung rounded-lg flex'>
              <textarea type='text' value={typedContent} onChange={(e) => setTypedContent(e.target.value)} name='message' className=' h-24 w-full bg-transparent outline-none text-wrap text-lg text-white text-start flex overflow-y-scroll p-1' placeholder='Input Your Content ....'/>
              <button onClick={sendPostHandler}>
                <BsSendFill  className='text-4xl font-extrabold text-yellow-400 pt-2 pr-2 cursor-pointer' />
              </button>
            </div>
    </div>
  )
}

export default PostInput