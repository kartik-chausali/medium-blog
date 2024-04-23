import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Dropdown = ()=>{
    const [isOpen , setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }

    },[])
    function handleClick(){
        setOpen(!isOpen);
    }

    async function handlSignOut(){
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signout`,{},{
            
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        toast.success("Logged out");
        navigate('/signup');
    }

   return <div className="relative" ref={dropdownRef}>
   <button  onClick={handleClick}  id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="{hover | click}" className="text-white h-3 w-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">...
</button>
{isOpen && (<div id="dropdownHover" className=" absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-40d dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handlSignOut} >Logout</a>
      </li>
    </ul>
</div>
) }

</div> 
}

 {/* <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"> */}
{/* <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg> */}