import {useEffect} from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice";
import { useSelector } from "react-redux";

import axios from "axios"
const getOtherUsers = ()=>{
    let dispatch = useDispatch();
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                  let others = await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
                  dispatch(setOtherUsers(others.data))
            }
            catch(error)
            {
                  console.log(error.response.data.message)
            }
        }
        fetchUser()
    },[userData])
}


export default getOtherUsers