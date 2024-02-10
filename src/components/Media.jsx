import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import Loader from './Loader';
import PostComponent from './PostComponent';
import { AppContext } from '../context/AppContext';

const Media = () => {

    const {allPost, setAllPost,user} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    // for get all posts
    const posts = async() => {
        try{
            setLoading(true);
            const {data} = await axios.get("https://content-media.onrender.com/api/v1/content-media/getAllPosts");
            setAllPost(data?.Posts);
            console.log("data is here => ",data);
            setLoading(false);
    
        }catch(err){
            console.log("err while get all post => => ",err);
            
        }
    }
  
  
    const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
      };


    const handleLike = async (postid)=>{
      try{
        const {data:{updatedpost}}=await axios.post("https://content-media.onrender.com/api/v1/content-media/likepost",
        {postid:postid},config);
        //console.log("like data updatePost =>>>>>", updatedpost);

        // find a index of post from allpost arr
        const index = allPost.findIndex((post)=>post._id === postid);
        const prevposts=[...allPost];

        // update this index of all post
        prevposts[index]=updatedpost;
        setAllPost(prevposts);
      }catch(err){
        console.log("err while try to like =>>>>", err);
      }
    }

    const handleDisLike=async (postid)=>{
        try{
          const {data:{updatedpost}}=await axios.post("https://content-media.onrender.com/api/v1/content-media/disLikePost",
          {postid:postid},config);
          
          // find from allpost index of a post basis of post id
          const index=allPost.findIndex((post)=>post._id===postid);
          const prevposts=[...allPost];

          // in this index store updatedpost
          prevposts[index]=updatedpost;
          setAllPost(prevposts);
        }catch(err){
          console.log("err while dislike post =>>>", err);
        }
      }
    useEffect(() => {
        posts();
    }, []);

  return (
    <div>
        {
            loading ? (<Loader/>) 
            : 
            (
                allPost?.map((post, index) => {
                    return (
                        <PostComponent key={post._id} post={post}
                        id={user?._id} handleLike={()=>handleLike(post._id)} 
                        handleDisLike={()=>handleDisLike(post._id)}/>
                    )
                }
                )
            )
        }
    </div>
  )
}

export default Media