import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export interface Profile{
    name:string, 
    id:string, 
    email:string,
    password:string, 
}

export interface ProfileUserBlogs{
    id:string, 
    tittle:string, 
    content:string,
    createdAt:string,
    author:string,
}

export const useProfile = ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile>()
    useEffect(()=>{
        fetchProfile({setLoading, setProfile, id})
    }, [])

    return {loading, profile}
}

async function fetchProfile({setLoading, setProfile, id}:{setLoading:(val:boolean)=>void , setProfile:(val:Profile)=>void , id:string}){

    try{
         const res = await axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
    setProfile(res.data)
    setLoading(false)

    }catch(e){
        if(axios.isAxiosError(e)){
            toast.error(e.response?.data || "An error occured");
        }else{
            toast.error("An unexpected error occurered")
        }
        
    }
   
}   


export const useProfileBlogs = ({id}:{id:string})=>{

    const[profileBlogs, setProfileBlogs] = useState<ProfileUserBlogs[]>()

    useEffect(()=>{
        fetchProfileBlogs({setProfileBlogs, id});
    },[])

    return {profileBlogs}
}

async function fetchProfileBlogs({setProfileBlogs, id} : {setProfileBlogs:(val : ProfileUserBlogs[])=>void, id:string}){
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/profileBlogs/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        setProfileBlogs(res.data);
}