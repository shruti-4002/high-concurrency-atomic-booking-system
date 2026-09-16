
import redis from '../config/redisConfig.js';

export const rateLimit=async(userId)=>{

const capacity=10;
const refillRate=5/60


const script=`local capacity= tonumber(ARGV[1])
              local refillRate= tonumber(ARGV[2])
              local currentTime= ARGV[3]
              local UserId=KEYS[1]

            local Data=redis.call("HMGET",UserId,"lastTime","lastToken")
            local lastTime = tonumber(Data[1]) or currentTime
            local lastToken = tonumber(Data[2]) or capacity

            local Gap=math.max(0,currentTime-lastTime)
            local TokenGenrated=Gap*refillRate

            local FinalToken= math.min(capacity,TokenGenrated+lastToken)

            if FinalToken>=1 then
            
            redis.call("HSET",UserId,"lastTime",currentTime,"lastToken",FinalToken-1)
            redis.call("EXPIRE",UserId,3600)

            return 1

            else
              return 0
            end



`;

return await redis.eval(script,1,userId,capacity,refillRate,Date.now()/1000)

}