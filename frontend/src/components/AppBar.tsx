import Avatar from "react-avatar"
import {Link} from 'react-router-dom'
import { Dropdown } from "./Dropdown"
export const AppBar = ()=>{

    return <div className="flex justify-between border-b px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center">
            Medium
        </Link>
        <div className="flex  justify-center">
            <Link to={'/publish'}>
        <button type="button" className="pr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ New Blog</button>
        </Link>
        <Avatar name="foo bar " round={true} size="40" />
        <div className="max-h-1 mr-5">
            <Dropdown />
        </div>
        
        </div>
        
    </div>
}