import { Worker } from "bullmq";
import redis  from "../config/redisConfig.js";
import { sendWelcomeEmail } from "../utils/mailer.js";

const sendEmail=async(job)=>{
    const {email,name}=job.data;

    if(job.name==="sendWelcomeEmail"){
        await sendWelcomeEmail(email,name);
    }

}



const worker=new Worker("emailQueue",sendEmail,{connection:redis})



worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.log(`Job failed: ${job.id}`, err);
});