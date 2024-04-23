import {useEffect, useState} from 'react'
import axios from 'axios'
import {BACKEND_URL} from '../config'
import toast from 'react-hot-toast'

export interface Blog{
    tittle:string,
    content:string,
    id:string,
    author:{
        name:string
    },
    createdAt:string
}
export const useSingleBlog = ({id} :{id:string})=>{

    const [loading , setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        fetchBlog({setBlog, setLoading, id})
    },[])

    return {loading, blog}
}

async function fetchBlog({setBlog, setLoading, id}){
    try{
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/single/${id}`, {
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        setBlog(res.data.blog);
        setLoading(false);
    }catch(e){
        toast.error(e.response.data);
    }
}


export const useBlogs = ()=>{


    const [loading , setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        fetchBlogs({setBlogs, setLoading})
    },[])

    return {loading, blogs}
}

async function fetchBlogs({setBlogs, setLoading} ){
    try{
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        setBlogs(res.data.blogs);
        setLoading(false);
    }catch(e){
        toast.error(e.response.data);
    }
   
}