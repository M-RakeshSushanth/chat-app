import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUsers:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        },
        
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload
        },
        setSelectedusers:(state,action)=>{
            state.selectedUsers=action.payload
        }
    }
})

export const {setUserData,setOtherUsers,setSelectedusers} = userSlice.actions
export default userSlice.reducer