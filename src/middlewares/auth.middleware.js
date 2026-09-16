import prisma from "../config/db.js";
import {verifyAccessToken} from "../utils/Token.js"
import redis from '../config/redisConfig.js';


export const authmiddleware=async(req,res,next)=>{
try{

        const accessToken= req.headers.authorization?.split(" ")[1];
        

if(!accessToken){
    return res.status(401).json({
        message:"User Not Authorized or User Logged Out"

    })
   }


      const accessTokenBlackList=await redis.get(`blacklist:${accessToken}`);

      if(accessTokenBlackList){
        return res.status(401).json("you are logged Out Kindly Login Again");
      }

   
   
  

   
let decoded;
try{
   decoded = verifyAccessToken(accessToken, process.env.MY_ACCESS_TOKEN_SECRET);
}catch (jwtErr) {
      if (jwtErr.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access Token Expired",
          code: "TOKEN_EXPIRED"
        });
      }
      return res.status(401).json({ message: "Invalid or Malformed Token" });
    }





   if(!decoded){
     return res.status(401).json({ message: "NOT AUTHORIZED" });
        }
   

   if (decoded.isSuspended) {
            return res.status(403).json({ message: "ACCOUNT SUSPENDED BY ADMIN" });
        }
    
    
  
    const userId = decoded.userId;

    req.userId = userId;
    
        next();

}catch(err){

    console.log("DEBUG ERROR:", err.name, err.message);

    if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access Token Expired", code: "TOKEN_EXPIRED" });
        }

    return res.status(401).json({ message: "Invalid Token" });
}
}





export const isAdmin=async(req,res,next)=>{
try{  
    const userId = req.userId;

    const query=await prisma.$queryRaw`Select role from "User" where id=${userId}` 

    if(query.length===0||query[0].role!="ADMIN"){
         return res.status(400).json({ message: "UnAuthorized Access" });
    }
    next();

}catch(err){
    return res.status(500).json({ message: "Internal Server Error" });
}
}