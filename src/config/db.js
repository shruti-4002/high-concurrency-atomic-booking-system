import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 2. Database connection function
export const connectDB = async () => {
  try {
   
    await prisma.$connect();
    console.log(" Neon Database Connected Successfully!");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1); 
  }
};


export default prisma;