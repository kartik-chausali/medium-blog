
import { useState } from "react";
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/animation/Skeleton";
import {useBlogs} from '../hooks/useBlogs'
import Pagination from "../components/Pagination";

export const Blogs = ()=>{
    const {loading, blogs } = useBlogs();
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3;
    const totalpages = Math.ceil(blogs.length/blogsPerPage);

    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }

    const getVisibleBlogs =()=>{
        const startIndex = (currentPage-1)* blogsPerPage;
        const endIndex = Math.min(startIndex+blogsPerPage, blogs.length);
        return blogs.slice(startIndex, endIndex);
    }
    
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
    <div className="justify-center max-w-3xl w-1/2">

        {getVisibleBlogs().map(blog=>
            <BlogCard id={blog.id} author={blog.author.name || "anonymous"} tittle={blog.tittle} content={blog.content} createdAt={blog.createdAt} authorCreatedAt={blog.author.createdAt}/>
        )}
        
    <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalpages} onPageChange={handlePageChange}/>
    </div>
    </div>
    </div> 
    </div>
    }
    
}