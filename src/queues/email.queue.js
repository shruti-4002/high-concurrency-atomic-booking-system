import { Queue } from "bullmq";
import  redis  from "../config/redisConfig.js";

export const emailQueue = new Queue("emailQueue", {
  connection:redis
});

