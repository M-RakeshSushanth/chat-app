import React,{useRef, useState} from 'react'
import dp from "../assets/dp3.webp"
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {serverUrl } from '../main.jsx'
import { setUserData } from '../redux/userSlice';
import axios from 'axios';

function Profile() {
  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()
  let image = useRef()
  let [name,setName] = useState(userData?.name||"")
 let [frontendImage,setFrontendImage] = useState(userData.image ||dp)
 let [backendImage,setBackendImage] = useState(null)
let dispatch = useDispatch()
let [saving,setSaving] = useState(false)

 const handleImage =(e)=>{
  let file = e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
 }


 const handleProfile = async(e)=>{
  setSaving(true)
  e.preventDefault()
  try{
        let formData  = new FormData()
        formData.append("name",name)
        if(backendImage)
        {
          formData.append("image",backendImage)
        }
        let result = await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
        setSaving(false)
        dispatch(setUserData(result.data))
        navigate("/")
  }catch(error)
  {
console.log(error)
setSaving(false)
  }

 }
  return (
    <div className=' w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
      <div className="fixed top-[20px] left-[20px] ">
        <IoArrowBackOutline className="w-[40px] h-[40px] text-gray-600 cursor-pointer hover:text-gray-900" onClick={()=>navigate("/")}/>
      </div>
        <div className=' bg-white rounded-full border-2 border-[#20c7ff] shadow-gray-400 shadow-lg relative' onClick={()=>image.current.click()}>
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center">
             <img src={frontendImage} alt="profile" className="h-full w-full object-cover"/>
          </div>
          <div className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex justify-center items-center border border-gray-300 cursor-pointer shadow-md">
              <IoCameraOutline className="w-6 h-6 text-gray-700"/>
          </div>
        </div>
        <form action="" className="mt-8 w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center" onSubmit={handleProfile}>
          <input type="file" accept="image/*" ref={image} hidden onChange={handleImage}/>
          <input type="text" placeholder='enter your name' className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg" onChange={(e)=>{
            setName(e.target.value)
          }} value={name}/>
          <input type="text" readOnly value={userData?.userName}className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-400"/>
          <input type="text" readOnly value={userData?.email}className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-400"/>
          <button type="submit" className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] font-semibold hover:shadow-inner cursor-pointer" disabled={saving}>{saving?"saving...":"save profile"}</button>
        </form>
    </div>
  )
}

export default Profile
