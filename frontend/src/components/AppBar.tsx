import Avatar from "react-avatar"
import {Link} from 'react-router-dom'
import { Dropdown, getUserId } from "./Dropdown"
import {  useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const AppBar = ()=>{
   const [id, setId] = useState('')
   const [name , setName] = useState('')
   const[loading , setLoading] = useState(true);

    useEffect(()=>{
        getUserId({setId, setLoading});
        
    },[id]);

    if(!loading){
        getUser({id, setName})
    }
   

    return <div className="flex justify-between border-b px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center font-extrabold text-3xl">
            Medium
        </Link>
        <div className="flex  justify-center">
            <Link to={'/publish'}>
        <button type="button" className="pr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ New Blog</button>
        </Link>
        <Avatar name={name} round={true} size="40" />
        <div className="max-h-1 mr-5">
            <Dropdown />
        </div>
        
        </div>
        
    </div>
}

async function getUser({id, setName} : {id:string, setName: (val: string)=>void}){
    const res = await axios.get(`${BACKEND_URL}/api/v1/user/${id}`);
    setName(res.data.name)


}