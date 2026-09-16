//3 parts //lock => accquire lock // release lock //critical tasks 

import redis from '../config/redisConfig.js';


export const acquirelock=async(seatId,userId)=>{
    const islockAquired=await redis.set(`seat:${seatId}`,userId,"NX","PX",3000);//3 sec transcation done
    return islockAquired==="OK"
}

export const releaseLock=async(seatId,userId)=>{
    //kEYS[1]=seatId
    //ARGV[1]=userId

    const script=`
    if redis.call("get",KEYS[1])==ARGV[1] then 
       return redis.call("del",KEYS[1])
    else
        return 0
    end
    `
try {
        const result=await redis.eval(script, 1, `seat:${seatId}`, userId)
        return result===1
    } catch (err) {
        console.error("Redis Release Lock Error:", err);
        return false
    }
}



