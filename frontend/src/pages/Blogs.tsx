
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/animation/Skeleton";
import {useBlogs} from '../hooks/useBlogs'

export const Blogs = ()=>{
    const {loading, blogs } = useBlogs();
    if(loading){
        return <div >
            <AppBar/>
            <div className="flex justify-center">
            <div className="w-1/2 ">
              <Skeleton />
             <Skeleton />
             <Skeleton />   
             <Skeleton />   
             <Skeleton />   
            </div>
             
        </div>
        </div>
         
    }else{
        return <div>
        <AppBar />
    <div className="flex justify-center">
    <div className="justify-center max-w-3xl">
        {blogs.map(blog=>  <BlogCard id={blog.id} author={blog.author.name || "anonymous"} tittle={blog.tittle} content={blog.content} createdAt={blog.createdAt}/>
)}
        
    </div>
    </div> 
    </div>
    }
    
}