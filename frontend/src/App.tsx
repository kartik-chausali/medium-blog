
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Blog} from './pages/Blog'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Toaster } from 'react-hot-toast'
import {Blogs} from './pages/Blogs'
import { Publish } from './components/Publish'
import { Profile } from './pages/Profile'

function App() {
  

  return (
    <>
    <div>
    <Toaster
      position='top-center'
      toastOptions={{
        success:{
          iconTheme:{
            primary:"#747bff",
            secondary:"#747bff"
          }
        }
      }}></Toaster>
    </div>
    
     <BrowserRouter>
     <Routes>
      
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/blogs' element={<Blogs />}/>
      <Route path='/publish' element={<Publish/>}/>
      <Route path='/profile/:id' element={<Profile />}/>
      
     </Routes>

     </BrowserRouter>
   
    </>
  )
}

export default App
