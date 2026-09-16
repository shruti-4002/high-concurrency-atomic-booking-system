import prisma from "../config/db.js";

export const createSeatCategory = async (req, res) => {
try{
    const {type,price,eventId}=req.body

    const result=await prisma.$queryRaw`
    INSERT INTO "SeatCategory"(id,type,price,"eventId")
    VALUES(gen_random_uuid(),${type}, ${price},
      ${eventId})
    
    RETURNING *`

    res.status(200).json(result[0]);
}catch(err){
    console.log(err.message);
    res.status(500).json({message:"SOME ERROR OCCURED"});
}



}