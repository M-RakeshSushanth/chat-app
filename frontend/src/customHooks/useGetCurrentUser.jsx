import {useEffect} from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice";
import { useSelector } from "react-redux";

import axios from "axios"
const useGetCurrentuser = ()=>{
    let dispatch = useDispatch();
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                  let result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                  dispatch(setUserData(result.data.user))
            }
            catch(error)
            {
                  console.log(error.response.data.message)
            }
        }
        fetchUser()
    },[])
}


export default useGetCurrentuser