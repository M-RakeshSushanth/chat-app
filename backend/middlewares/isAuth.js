import jwt from "jsonwebtoken" 

const isAuth = async(req,res,next)=>{
    try{

        let token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"token is not found"})
        }

        let decoded = await jwt.verify(token,process.env.JWT_SECRET)

        console.log(decoded)

        req.userId = decoded.userId
        next()

    }catch(err){
        return res.status(401).json({message:"invalid or token expired"})

    }
}

export default isAuth