
import { useParams } from "react-router-dom"
import { useProfile, useProfileBlogs } from "../hooks/useProfile"
import { BlogCard } from "../components/BlogCard";
import Avatar from "react-avatar";
import { useRef } from "react";
import { Skeleton } from "../components/animation/Skeleton";

export const Profile = ()=>{
    const {id} = useParams();
    const {loading, profile} = useProfile({id : id || ""})
    const {profileBlogs} = useProfileBlogs({id : id || ""})
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonTextRef = useRef<HTMLButtonElement>(null)
    if(loading){
        return <div>
           
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center mb-5">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
            <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
        
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>

        </div>
    }else{
       return <div className="w-full">
       <div className="flex justify-center">
        <div className="flex flex-col">
            <div className="flex justify-center items-center p-3">
                <Avatar name={profile?.name} round={true} size="60"/>
                <h2 className="ml-2 font-bold text-2xl">{profile?.name}</h2>
            </div>
            <div className="mb-6 mt-5">
                <label  className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500 ">Your registered email</label>
                <input type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-green-500" value={profile?.email}/>
            </div>
            <div className="mb-6 ">
                <label  className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500 ">Your password</label>
                <div className="flex">
                <input ref={inputRef} type="password" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-green-500" value={profile?.password}/>
                <button ref={buttonTextRef} className="ml-2 h-7 mt-2 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer " onClick={()=>{
                        
                       if(inputRef.current?.type == 'text'){
                       inputRef.current.type = 'password'; 
                       if(buttonTextRef.current){
                        buttonTextRef.current.innerText = buttonTextRef.current.innerText == 'Show' ? "Hide" : "Show"
                       }
                       
                    }
                else {

                        if(inputRef.current){
                            inputRef.current.type = 'text';
                        }
                        
                        if(buttonTextRef.current){
                            buttonTextRef.current.innerText = buttonTextRef.current.innerText == 'Show' ? "Hide" : "Show"
                        }
                        
                    }
                }}>Show</button>
                </div>
            </div>
        </div>
       </div>
       <div className="text-lg font-semibold ml-5">
        Your Blogs
       </div>
        <div>
            {profileBlogs?.map(blog => <BlogCard tittle={blog.tittle}  id={blog.id} content={blog.content} createdAt={blog.createdAt} author={profile?.name || ""}/>)}
        </div>
    </div> 

    }
    
}