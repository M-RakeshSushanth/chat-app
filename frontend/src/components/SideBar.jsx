import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp3.webp"
import { IoMdSearch } from "react-icons/io";
import axios, { formToJSON } from 'axios';
import { RxCross2 } from "react-icons/rx";
import { SlLogout } from "react-icons/sl";
import { serverUrl } from '../main';
import { setOtherUsers, setSelectedusers, setUserData } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";


function SideBar() {
    let {userData,otherUsers} = useSelector(state=>state.user)
    const {selectedUsers} = useSelector(state=>state.user)
    let [search,setSearch] = useState(false)
    let dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogout = async()=>{
        try{
            let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        }
        catch(err)
        {
            console.log(err)
        }
    }
  return (
    
    <div className={`lg:w-[30%] lg:block ${!selectedUsers?"block":"hidden"} w-full h-full bg-slate-200`}>
            <div className="w-[50px] h-[50px] rounded-full bg-[#20c7ff] overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer mt-[20px] flex-shrink-0 fixed bottom-[20px] left-[10px]" onClick={()=>handleLogout()}>
                 <SlLogout  className='w-[25px] h-[25px]'/>
            </div>
        <div className="w-full h-[220px] bg-[#20c7ff] rounded-b-[20%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[25px]">
          <h1 className="text-white font-bold text-[19px]">chatly</h1>
          <div className='w-full flex justify-between items-center'>
            <h1 className="text-gray-700 font-bold text-[19px]">hi, {userData.name||"user"}</h1>
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg" onClick={()=>navigate("/profile")}>
                 <img src={userData.image ||dp } alt="profile" className="h-full w-full object-cover"/>
            </div>
          </div>
          <div className='w-full flex items-center gap-[20px]'>
            {!search && <div className="w-[50px] h-[50px] rounded-full bg-white overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer mt-[20px] flex-shrink-0" onClick={()=>setSearch(true)}>
                 <IoMdSearch className='w-[25px] h-[25px]'/>
            </div>}
            {search && <form className='w-full h-[60px]  bg-white overflow-hidden flex justify-center px-[15px] items-center gap-[10px] shadow-gray-500 shadow-lg rounded-full mt-[20px]'>
                <IoMdSearch className='w-[25px] h-[25px]'/>
                <input type="text" placeholder='search users...' className='w-full h-full p-[10px] outline-none border-0 rounded-md text-[17px]'/>
                <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)}/>
                </form>}
            {!search && <div className="w-full flex gap-[15px] overflow-x-auto mt-[20px] min-w-0 no-scrollbar">
              {otherUsers?.map((user, index)=>(
              <div key={index} className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center flex-shrink-0">
                   <img src={user.image ||dp } alt="profile" className="h-full w-full object-cover"/>
              </div>
               ))}
          </div>}
          </div>
      </div>
          <div className='w-full h-[calc(100vh-236px)] flex flex-col gap-[20px] overflow-y-auto no-scrollbar mt-2'>
              {otherUsers?.map((user)=>(
                <div key={user._id} className='w-[95%] h-[60px] flex justify-start items-center gap-[20px] bg-slate-200 border-t-2 border-b-2 border-gray-300 shadow-gray-300 shadow-lg rounded-full ml-[10px] hover:bg-[#82aac4]' onClick={()=>dispatch(setSelectedusers(user))}>
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center flex-shrink-0">
                        <img src={user.image ||dp } alt="profile" className="h-full w-full object-cover"/>
                    </div>
                    <h1 className='font-semibold text-[15px] text-gray-800'>{user.name||user.userName}</h1>
                </div>
               ))}
          </div>
    </div>
  )
}

export default SideBar
