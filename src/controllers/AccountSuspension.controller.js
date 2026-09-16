import prisma from "../config/db.js";
import redis from "../config/redisConfig.js";


export const AccountSuspension=async(req,res)=>{
  try{  
       const {userToBeSuspendedId,reason}=req.body
       
       if (!userToBeSuspendedId) {
      return res.status(400).json({ message: "User ID is required" });
    }

       const rowsAffected=await prisma.$executeRaw`UPDATE  "User" set "isSuspended"=true WHERE id = ${userToBeSuspendedId}`



       if (rowsAffected === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await redis.del(`refreshToken:${userToBeSuspendedId}`) 


       return res.status(200).json({ 
      message: "Account suspended successfully and session terminated" 
    });

  }catch(error){

    console.error("Error in AccountSuspension:", error.message);
    return res.status(500).json({ error: "Account suspension failed", details: error.message });
  }


  }