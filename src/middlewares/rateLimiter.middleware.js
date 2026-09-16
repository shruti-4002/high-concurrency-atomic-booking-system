

import { rateLimit } from '../config/redisRateLimiter.js';

export const rateLimiterMiddleware = async (req, res, next) => {
    const userId = req.userId || req.ip;
    
    const isAllowed = await rateLimit(userId);

    if (isAllowed) {
        next(); 
    } else {
        res.status(429).json({ 
            success: false, 
            message: "Too many requests! Try Later." 
        });
    }
};