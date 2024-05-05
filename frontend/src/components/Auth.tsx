/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent,  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {SignupInput} from '@100xdevs/medium-common'
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"
import { Spinner } from "./animation/Spinner"



export const Auth = ({type}: {type : "signup" | "signin"})=>{
    const navigate = useNavigate()

    const[loading , setLoading ] = useState(false);
    const [inputs, setInputs] = useState<SignupInput>(
        {
            name:"",
            username:"",
            password:""
        }
    )   
 
    

    async function sendRequest(){
        try{
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup'? 'signup':'signin'}`, inputs)
            const jwt = response.data.jwt;
            localStorage.setItem('token', jwt);
            toast.success(type === 'signup' ? "Signed up successfully" : "Logged in successfully" );
            navigate('/blogs')
            
        }catch(err : any ){
            setLoading(false);
           toast.error(`${err.response.data.msg}`);
        }
      
    }
    return <div className="flex flex-col justify-center  h-screen">
        <div className="flex justify-center ">
            <div>

            <div className="px-10 pb-8">
                  <div className=" text-2xl md:text-5xl text-extrabold">
                {type === 'signup' ? 'Create An Account ' : 'Login to your account'}
            </div>

            <div className="text-slate-400">
                {type === 'signup' ? "Already have an Account? " : "Don't have an Account?"}
                <Link to={type === 'signup' ? '/signin' : '/signup'} className="pl-2 underline">{type === 'signup'? "Login" : "Signup"}</Link>
            </div>
            </div>
          
            {type === 'signup' ? <LabelledInput label="Name" placeholder="xyz" onChange={(e)=>{
                setInputs({
                    ...inputs,
                    name: e.target.value
                })
                
            }}/> : null}

            <LabelledInput label="Username" placeholder="user@example.com" onChange={(e)=>{
                setInputs({
                    ...inputs,
                    username:e.target.value
                })
            }}/>

            <LabelledInput label="Password" placeholder="min 6 length" type={"password"} onChange={(e)=>{
                setInputs({
                    ...inputs,
                    password:e.target.value
                })
            }}/>
            
            <button onClick={sendRequest} type="button" className=" w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{loading ? <Spinner /> : type === "signup" ? "SignUp" : "SignIn"}</button>
           
            </div>
        </div>
       
    </div>
  
}

interface labelledInputsType {
    label:string,
    placeholder:string, 
    onChange:(e:ChangeEvent<HTMLInputElement> )=> void,
    type? : string,
}

function LabelledInput({label, placeholder, onChange, type}: labelledInputsType){
    return <div>
    <label  className="block mb-2 text-sm font-semibold \ text-black pt-4">{label}</label>
    <input onChange={onChange} type={type || ""} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div>
}