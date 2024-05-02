import Avatar, { ConfigProvider } from 'react-avatar'
import 'react-quill/dist/react-quill'
import { Link } from 'react-router-dom'

interface BlogCardInputs{
    tittle:string,
    author:string,
    content: string,
    id:string,
    createdAt:string,
    
}
export const BlogCard = ({
    tittle, 
    author, 
    content,
    id,
    createdAt,
    
} : BlogCardInputs) =>{
    
    const d = new Date(createdAt); //to reformat the date


    
    return <Link to={`/blog/${id}`}> 
    <div className=" border-b-2 border-b-slate-200 p-6 cursor-pointer">
        <div className='flex items-center'>
            <ConfigProvider colors={['red', 'green', 'blue', 'yellow', 'purple', 'black', 'grey']}>
             <Avatar round={true}  size='50' alt={author} name={author} fgColor='#00FF00'/>
             </ConfigProvider>
            <div className='font-extralight pl-2'>
                {author}
            </div>
            <div className='pl-2 align-bottom mt-2'>
                <Circle />
            </div>
            <div className='pl-2 font-thin text-slate-500'>
               {d.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })} 
            </div>
             
        
        </div>
       
        <div className='font-semibold text-xl'>
            {tittle}
        </div>
        <div className='text-md font-thin' dangerouslySetInnerHTML={{__html:content.slice(0,100)+"..."}}>
        
        </div>
        <div className='text-slate-400 text-sm  w-20 shadow-lg mt-2 mb-2 bg-slate-100'>
            {`${Math.ceil(content.length/1000 )} min read`}
        </div>
    </div>
    </Link>
}

export function Circle(){
    return <div className='h-1 w-1 rounded-full bg-slate-500'>

    </div>
}