import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import dp from "../assets/dp3.webp"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedusers } from '../redux/userSlice';


function MessageArea() {
    let {selectedUsers} = useSelector(state=>state.user)
    let dispatch = useDispatch()
  return (
    <div className={`lg:w-[70%] ${selectedUsers?"flex":"hidden"} lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
        {selectedUsers && <div className="w-full h-[70px] bg-[#20c7ff] rounded-b-[30px] shadow-gray-400 shadow-lg flex gap-[10px] items-center px-[15px]">
          <div className="cursor-pointer" onClick={()=>dispatch(setSelectedusers(null))}>
                <IoArrowBackOutline className="w-[30px] h-[30px] text-gray-600 hover:text-gray-900"/>
            </div>
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg">
                <img src={selectedUsers?.image||dp} alt="profile" className="h-full w-full object-cover"/>
            </div>
            <h1 className='font-semibold text-[15px] text-gray-800'>{selectedUsers?.name||selectedUsers?.userName||"user"}</h1>
      </div>}
      {!selectedUsers && <div className='w-full h-full flex flex-col font-bold text-gray-800 justify-center items-center'>
        <h1 className='text-[50px]'>welcome to chatly</h1>
        <span className='text-[30px]'>chat friendly !</span>
        </div>}
      
    </div>
  )
}

export default MessageArea
