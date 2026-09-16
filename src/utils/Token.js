import jwt from "jsonwebtoken"


const ACCESS_EXPIRES=process.env.ACCESS_TOKEN_EXPIRES||"40m";
const REFRESH_EXPIRES=process.env.REFRESH_TOKEN_EXPIRES||"7d";

export function signAccessToken(payload){
    return jwt.sign(payload,process.env.MY_ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_EXPIRES});

}

export function verifyAccessToken(payload){
    return jwt.verify(payload,process.env.MY_ACCESS_TOKEN_SECRET);
    
}

export function signRefreshToken(payload){
    return jwt.sign(payload,process.env.MY_REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_EXPIRES});

}

export function verifyRefreshToken(payload){
    return jwt.verify(payload,process.env.MY_REFRESH_TOKEN_SECRET);
    
}


