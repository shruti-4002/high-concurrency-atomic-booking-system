import bcrypt from 'bcrypt'
import prisma from "../config/db.js";
import {signAccessToken,verifyAccessToken,signRefreshToken,verifyRefreshToken} from "../utils/Token.js"
import redis from '../config/redisConfig.js';
import { emailQueue } from "../queues/email.queue.js";


export const register=async(req,res)=>{
try{
    const {email,name,password}=req.body;
    const query=await prisma.$queryRaw`Select * FROM "User" where email=${email} LIMIT 1`
    
    if(query.length>0){
       return res.status(200).json({message:"User Already exists Try Login"})
    }

      const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);




    const  query2=await prisma.$executeRaw`INSERT INTO "User"(id,name,email,password,"updatedAt") VALUES(gen_random_uuid(),${name},${email},${hashedPassword},NOW())`

    
      await emailQueue.add(
  "sendWelcomeEmail",{email,name},
   {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000
    }
  }
);



    return res.status(201).json({
    message: "User registered successfully"

   
    
});




}catch(err){

    console.log(err);

    return res.status(500).json({
    message: "Some Error Occured try again",
  
    
});
}


}

export const login=async(req,res)=>{
try{   
  
  const {email,password}=req.body



    const query=await prisma.$queryRaw`SELECT * FROM "User" Where email=${email}`
    if(query.length===0){
            return res.status(401).json({message:"LOGIN request failed USER NOT REGISTERD OR EMAIL/PASSWORD INCORRECT"})
    }

    if(query[0].isSuspended===true){
        return res.status(401).json({
    message: "ACCOUNT SUSPENDED BY ADMIN CONTACT ADMIN"});
    }

   const checkpass=await bcrypt.compare(password,query[0].password);

   if(!checkpass){
    return res.status(401).json({message:" EMAIL/PASSWORD INCORRECT"})
    }

   const newRefreshToken=signRefreshToken({ userId: query[0].id })
   const newAccessToken=signAccessToken({ userId: query[0].id,isSuspended:query[0].isSuspended});

    res.cookie("refreshToken", newRefreshToken, {
  httpOnly: true,        // no js attack/xss:cross site Scripting cookie.document
  secure: false,          // HTTPS required
  sameSite: "strict",    // CSRF protection it can be Lax too
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});


await redis.setex(`refreshToken:${query[0].id}`, 7 * 24 * 60 * 60, newRefreshToken);

res.json({
    accessToken:newAccessToken
})

}catch(err){
    console.log(err);
    return res.status(500).json({
    message: "Some Error Occured try again"
    
});
}

}

export const logout=async(req,res)=>{
try{

    
   const accessToken=req.headers.authorization?.split(" ")[1]
   const userId=req.userId

   if(!accessToken){
    return res.status(200).json({
        message:"User Logged out successfully"

    })
   }

   //we r blacklisting AccessToken 
   const ttlInSeconds =40*60
   const redisKey = `blacklist:${accessToken}`;

   await redis.setex(redisKey, ttlInSeconds, 'true');
   //notes:setex take 3 arguments key,expirytime,value


   await redis.del(`refreshToken:${userId}`) //clear refresh token redis
res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });

   return res.status(200).json({ 
            message: "Logged out successfully" 
        })

}catch(err){

 return res.status(500).json({
 error:err,
 message: "Some Error Occured try again"
    
});

}



    
}

export const refresh=async(req,res)=>{
try{
  const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

        const decoded=verifyRefreshToken(refreshToken,process.env.MY_REFRESH_TOKEN_SECRET);

        if(!decoded){
                      return res.status(401).json({ message: "Session Expired or UnAuthorized Access" });

        }

        const checkquery=await prisma.$queryRaw`Select "isSuspended" from "User" where id=${decoded.userId}`;
        if(checkquery[0].isSuspended){

          return res.status(401).json({message: "ACCOUNT SUSPENDED BY ADMIN CONTACT ADMIN"});
        
        }
        


   const isSessionActive = await redis.get(`refreshToken:${decoded.userId}`); 
   

     if (!isSessionActive) {          
            return res.status(401).json({ message: "Session Expired, Login Again" });
        }


      await redis.del(`refreshToken:${decoded.userId}`) //we deleting Old Token

     const newRefreshToken=signRefreshToken({ userId:decoded.userId })
   const newAccessToken=signAccessToken({ userId: decoded.userId,isSuspended:checkquery[0].isSuspended});

    res.cookie("refreshToken", newRefreshToken, {
  httpOnly: true,        // no js attack/xss:cross site Scripting cookie.document
  secure: false,          // HTTPS required
  sameSite: "strict",    // CSRF protection it can be Lax too
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});


await redis.setex(`refreshToken:${decoded.userId}`, 7 * 24 * 60 * 60, newRefreshToken);

return res.json({
    ACCESS_TOKEN:newAccessToken,
    "message":"Access_Token Refreshed and Refresh Token updated in cookie"
})

    

}catch(err){
  res.send(err);
}
    
}


