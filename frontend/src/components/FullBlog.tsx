import Avatar from "react-avatar"
import { Blog } from "../hooks/useBlogs"
import { AppBar } from "./AppBar"

export const FullBlog = ({blog}:{blog:Blog})=>{

    const d = new Date(blog.createdAt)
    const authorDate = new Date(blog.author.createdAt);

    return <div>
        <AppBar /> 
        <div className="flex justify-center">
    
    <div className="grid grid-cols-12 w-full px-10 pt-10 max-w-screen-2xl">
        <div className="col-span-8">
        <div className="font-extrabold text-5xl pt-10">
        {blog.tittle}
        </div>
        <div className="text-slate-500 pt-3">
            Posted on {d.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })} 
        </div>
        <div className="pt-4" dangerouslySetInnerHTML={{__html:blog.content}}>
             
        </div>
        </div>
        <div className=" col-span-4">

            <div className="text-lg text-slate-800 mb-5">
               Author 
            </div>
            
            <div className="flex pl-4">
            <Avatar name={`${blog.author.name}`} size="30" round="50px" color="#2f4f4f " className="mr-1" />
            <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
            </div>
            </div>

            <div className="pt-2 text-slate-500 pl-12">
                User since {authorDate.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })} 
            </div>
            
        </div>
    </div>
    </div>
    </div>
}