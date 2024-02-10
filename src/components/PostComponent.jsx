import React from 'react'
import { FcLikePlaceholder , FcLike } from "react-icons/fc";


const PostComponent = ({post, id, handleLike, handleDisLike}) => {

   // console.log("post is =>>>>>>>>>>", post);



  return (
    <div className='p-2 '>

        <div className=' pb-4 '>
            <div className='flex items-baseline gap-3 p-3'>
                <img src={post?.createdBy?.profile} alt='' className='h-[40px] w-[40px] rounded-full'/>
                <div className='flex flex-row justify-between w-full align-top'>
                    <div className=' text-slate-300 text-xl font-bold capitalize'>{post?.createdBy?.name}</div>
                    <div className='italic text-xs text-slate-400'>{post?.createdAt}</div>
                </div>
            </div>
            <div className='pl-16 pr-9 flex flex-col '>
                <div className=' p-5  rounded-lg backgroung relative '>
                    <p className=' text-gray-300 text-lg font-bold'>{post?.content}</p>
                    <div className='absolute  bottom-0 right-0 flex flex-col justify-center items-center' >

                        {/* if in likedusers arr in post this id mean user id is not present then can like otherwise dislike onclick */}
                        <div>
                            {
                            post.likedusers.indexOf(id)===-1 ? (<button><FcLikePlaceholder onClick={handleLike} color='' size={23} /></button> ) : 
                            (<button onClick={handleDisLike} ><FcLike size={23}></FcLike></button>)
                            }
                        </div>

                        <div className=' text-gray-400 text-xs font-bold'>
                            {
                                post.likedusers.length
                            }
                        </div>
                    
                    </div>

                </div>
                
            </div>
        </div>

    </div>
  )
}

export default PostComponent