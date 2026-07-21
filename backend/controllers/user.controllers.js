import uploadOnCloudinary from "../config/cloudinary.js"
import { upload } from "../middlewares/multer.js"
import User from "../models/user.model.js"

export const getCurrentUser = async(req,res)=>{
    try{
        let userId = req.userId
        let user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({user})
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
} 

export const editProfile = async(req,res)=>{
    try{

        let {name} = req.body
        let image;

        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        let user = await User.findByIdAndUpdate(req.userId,{
            name,
            image
        },{new:true})
        if(!user){
            return res.status(400).json(user)
        }

        return res.status(200).json(user)

    }catch(err){
        return res.status(500).json({message:`profile error ${error}`})

    }
}