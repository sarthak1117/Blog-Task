import jwt from "jsonwebtoken"
import { User } from "../models/Auth.model.js"


export const verifyJWT = async(req, _, next) => {
    try {
        const token = req.cookies?.Token || req.header("Authorization")?.replace("Bearer ", "")
        
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized request: No token provided" });
        }
        
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    
        const user = await User.findById(decodedToken.id).select("-password")
         
        if (!user) {
            
            return res.status(401).json({ message: "Invalid access token: User not found" });
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: " + error.message });
    }
    
}