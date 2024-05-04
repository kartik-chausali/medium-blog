/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactQuill from 'react-quill'
import { FormEvent, useState} from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './animation/Spinner'

// interface input{
//     titttle:string,
//     content:string,
//     file:string,
// }

export const Publish =()=>{
    const navigate = useNavigate()
    const [inputs , setInputs] = useState({
        tittle:"",
        content:"",
       
    })
    const[loading , setLoading] = useState(false);
    
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
        clipboard: {
            matchVisual: false,
          },
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

      async function createNewBlog(e : FormEvent){
        e.preventDefault()
        try{
            setLoading(true);
             const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, inputs,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
             });
             toast.success("Blog Posted")
            navigate('/blogs');
        }catch(err : unknown){
            setLoading(false);
            if(axios.isAxiosError(err)){
                toast.error(err.response?.data || "An error occured");
            }else{
                toast.error("Unexpected Error Occured")
            }
        }
       

      }

    return <form onSubmit={createNewBlog}>
        <div className='flex flex-col'>
                <input className="border border-black p-4 mt-5" placeholder='TITTLE' type='text' onChange={(e)=>{
            setInputs({
                ...inputs,
                tittle:e.target.value
            })
        }}/>
       
        
        <ReactQuill className='h-40 w-full mt-4' theme='snow' value = {inputs.content} modules={modules} formats={formats} onChange={(newValue)=>{
            setInputs({
                ...inputs,
                content: newValue
            })
        }}/>
        <div className='flex justify-center mt-5'>
         <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 w-1/2  ">
        {loading? <Spinner/> : 'Post'}
        </button>    
        </div>
        
        </div>
     
    </form>
}