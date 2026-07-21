import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import {serverUrl} from "../main.jsx"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'


function SignUp() {
  let navigate = useNavigate()
  let [show,setShow] = useState(false)
  let [userName,setUserName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [loading,setLoading] = useState(false)
  let [err,setErr] = useState("")


  let dispatch = useDispatch()

  const handleSignUp = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
        let result = await axios.post(`${serverUrl}/api/auth/signup`,{
           userName,email,password
        },{withCredentials:true})
        // console.log(result)
        dispatch(setUserData(result.data))
        setPassword("")
          setEmail("")
          setUserName("")
          setErr("")
    }catch(error){
      console.log(error)
      setErr(error?.response?.data?.message)
    }
    finally{
      setLoading(false)
    }
  }

  return(
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center" >
      <div className="w-full max-w-[500px] h-[90vh] bg-white rounded-b-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
          <div className="w-full h-[40vh] max-h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
               <h1 className="text-gray-600 font-bold text-[29px]">welcome to <span className="text-white">chatly</span></h1>
          </div>
          <form className="w-full flex flex-col gap-[15px] items-center" onSubmit={handleSignUp}>
               <input type="text" placeholder="username" autoComplete="username" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg" onChange={(e)=>{
                  setUserName(e.target.value)
               }} value = {userName}/>
               <input type="email" autoComplete="email" placeholder="email" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg" onChange={(e)=>{
                  setEmail(e.target.value)
               }} value = {email}/>
               <div className=" relative w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden shadow-gray-200 shadow-lg rounded-lg">
                 <input type={show ? "text" : "password"} autoComplete="current-password" placeholder="password" className="w-full h-full outline-none px-[20px] py-[10px] bg-white" onChange={(e)=>{
                  setPassword(e.target.value)
                 }} value={password}/>
                 <span className="absolute top-[50%] -translate-y-[50%] right-2 text-[#20c7ff] font-semibold cursor-pointer" onClick={()=>setShow(!show)}>{show?"Hide":"show"}</span>
               </div>
               <button className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] font-semibold hover:shadow-inner" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
               </button>
               {err && <p className="text-red-500">{err}</p>}

               <p className="cursor-pointer" onClick={()=>navigate('/login')}>Already have an account? <span className="text-[#20c7ff] font-semibold">Login</span></p>
          </form>
      </div>
    </div>
  )

}

export default SignUp
