import express from "express"
import {signUp,login,Logout} from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",Logout)

export default authRouter