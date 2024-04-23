import {Circle} from '../BlogCard'
export const Skeleton = ()=>{
    return <div role="status" className="animate-pulse">

<div className=" border-b-2 border-b-slate-200 p-6 cursor-pointer">
        <div className='flex items-center'>

        <div className="h-10 w-80 bg-gray-200 rounded-full  mb-4"></div>
        
     

            <div className='font-extralight pl-2'>
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
            <div className='pl-2 align-bottom mt-2'>
                <Circle />
            </div>
    
            <div className='pl-2 font-thin text-slate-500'>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
             
        
        </div>
       
        <div className='font-semibold text-xl'>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div className='text-slate-400 text-sm  w-20 shadow-lg mt-2 mb-2 bg-slate-100'>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
    </div>

    {/* <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div> */}
    <span className="sr-only">Loading...</span>
</div>

}

