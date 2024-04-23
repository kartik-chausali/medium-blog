
import { Auth } from "../components/Auth"
import { TypingAnimation } from "../components/animation/TypingAnimation"

export const Signup = () =>{
    return <div className="grid grid-cols-1 sm:grid-cols-2 sm:ml-5">
        <div>
            <Auth type="signup" />
        </div>
    <div className="invisible sm:visible sm:ml-10">
        <TypingAnimation /> 
    </div>
   
    </div>

  
}    