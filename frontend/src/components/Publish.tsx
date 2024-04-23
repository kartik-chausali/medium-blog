import ReactQuill from 'react-quill'
import {useRef, useState} from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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
        file:"" 
    })
    
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

      async function createNewBlog(e){
        e.preventDefault()
        try{
             const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, inputs,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
             });
             toast.success("Blog Posted")
            navigate('/blogs');
        }catch(err){
            console.log(err);
            toast.error(err.response.data);
        }
       

      }

    return <form onSubmit={createNewBlog}>
          <input placeholder='tittle' type='text' onChange={(e)=>{
            setInputs({
                ...inputs,
                tittle:e.target.value
            })
        }}/>
        <input type='file' onChange={(e)=>{
            setInputs({
                ...inputs,
               file: e.target.files || ""
            })
        }}/>
        <ReactQuill  theme='snow' value = {inputs.content} modules={modules} formats={formats} onChange={(newValue)=>{
            setInputs({
                ...inputs,
                content: newValue
            })
        }}/>
        <button>Create Blog</button>
    </form>
}