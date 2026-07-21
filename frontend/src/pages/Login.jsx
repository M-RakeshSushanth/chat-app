import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import {serverUrl} from "../main.jsx"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

function Login() {
  let navigate = useNavigate()
  let [show,setShow] = useState(false)
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [loading,setLoading] = useState(false)
    let [err,setErr] = useState("")
    let dispatch = useDispatch()

    const handleLogin = async(e)=>{
      e.preventDefault()
      setLoading(true)
      try{
          let result = await axios.post(`${serverUrl}/api/auth/login`,{
             email,password
          },{withCredentials:true})
          // console.log(result)
          dispatch(setUserData(result.data))
          setPassword("")
          setEmail("")
          setErr("")
      }catch(error){
        console.log(error)
        setErr(error.response.data.message)
      }finally{
        setLoading(false)
      }
    }
  return(
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center" >
      <div className="w-full max-w-[500px] h-[90vh] bg-white rounded-b-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
          <div className="w-full h-[40vh] max-h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
               <h1 className="text-gray-600 font-bold text-[29px]">login to <span className="text-white">chatly</span></h1>
          </div>
          <form className="w-full flex flex-col gap-[15px] items-center justify-center" onSubmit={handleLogin}>
               <input type="email" placeholder="email" autoComplete="email" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg" onChange={(e)=>{
                setEmail(e.target.value)}} value={email}/>
               <div className=" relative w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden shadow-gray-200 shadow-lg rounded-lg">
                 <input type={show ? "text" : "password"} autoComplete="current-password" placeholder="password" className="w-full h-full outline-none px-[20px] py-[10px] bg-white" onChange={(e)=>{
                  setPassword(e.target.value)}} value={password}/>
                 <span className="absolute top-[50%] -translate-y-[50%] right-2 text-[#20c7ff] font-semibold cursor-pointer" onClick={()=>setShow(!show)}>{show?"Hide":"show"}</span>
               </div>
               {err && <p className="text-red-500">{err}</p>}
               <button className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] font-semibold hover:shadow-inner" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
               </button>

               <p className="cursor-pointer" onClick={()=>navigate('/signup')}>want to create an account? <span className="text-[#20c7ff] font-semibold">Sign Up</span></p>
          </form>
      </div>
    </div>
  )

}

export default Login
