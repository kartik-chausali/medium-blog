

export const TypingAnimation = ({height} : {height:string})=>{
 
    return <div className={`flex h-${height} items-center justify-center bg-slate-200 p-10 `}>
    <div className="w-max">
      <h1 className="animate-typing  overflow-hidden  whitespace-nowrap border-r-4 border-r-white pr-5 text-2xl md:text-5xl font-bold text-wrap-break-words ">Medium-Blog</h1>
     
    </div>
    
  </div>
}