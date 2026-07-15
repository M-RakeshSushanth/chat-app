import React from 'react'
import {useNavigate} from "react-router-dom"

function SignUp() {
  let navigate = useNavigate()
  return(
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center" >
      <div className="w-full max-w-[500px] h-[90vh] bg-white rounded-b-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
          <div className="w-full h-[40vh] max-h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
               <h1 className="text-gray-600 font-bold text-[29px]">welcome to <span className="text-white">chatly</span></h1>
          </div>
          <form className="w-full flex flex-col gap-[15px] items-center">
               <input type="text" placeholder="username" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"/>
               <input type="email" placeholder="email" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"/>
               <div className="w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden shadow-gray-200 shadow-lg rounded-lg">
                 <input type="password" placeholder="password" className="w-full h-full outline-none px-[20px] py-[10px] bg-white"/>
                 <span className="absolute top-0 right-0">show</span>
               </div>
               <button className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] font-semibold hover:shadow-inner">Sign up</button>

               <p className="cursor-pointer" onClick={()=>navigate('/login')}>Already have an account? <span className="text-[#20c7ff] font-semibold">Login</span></p>
          </form>
      </div>
    </div>
  )

}

export default SignUp
