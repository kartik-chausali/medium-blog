import { useParams } from "react-router-dom";
import { useSingleBlog } from "../hooks/useBlogs"
import { FullBlog } from "../components/FullBlog";
import { Skeleton } from "../components/animation/Skeleton";

export const Blog = () =>{
    const { id } = useParams();
    const {loading, blog} = useSingleBlog({id : id || ""});
    if(loading){
        <Skeleton />
    }else{
         return <div>
            <FullBlog blog={blog}/>
    </div>
    }
   
}