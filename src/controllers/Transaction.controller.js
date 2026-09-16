import prisma from "../config/db.js";
import redis from "../config/redisConfig.js"
import { acquirelock, releaseLock } from "../config/redislock.js";


export const createBooking=async(req,res)=>{

   const {seatId,eventId,AmountPaid}=req.body;
    
    const userId = req.userId;


     const lock = await acquirelock(seatId, userId);
    if (!lock) {
        return res.status(423).json({ message: "Seat is currently being processed by someone else. Try again in 3 seconds." });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

try{
      const bookingData =await prisma.$transaction(async(tx)=>{
    
    
     await tx.$queryRaw`SELECT * FROM "Seat" WHERE id=${seatId} FOR UPDATE` 

    //checking available and get price ,seattype,seatcategory
    const query=await tx.$queryRaw`SELECT "SeatCategory".price ,"SeatCategory".type,"Event".name as eventname ,"Seat"."seatNo" FROM "Seat" INNER JOIN "SeatCategory" ON 
    "Seat"."categoryId"="SeatCategory".id INNER JOIN "Event" ON "Event".id="SeatCategory"."eventId" Where "Seat".id=${seatId} And "Seat"."status"='AVAILABLE'`

   
    if(query.length==0){
       throw new Error("SEAT_NOT_AVAILABLE");
    }

    if (Number(query[0].price)!=Number(AmountPaid)){
      throw new Error("PRICE_MISMATCH");
    }


     const query2=await tx.$queryRaw`INSERT INTO "Booking" (id,"userId","seatId","eventId",status,"pricePaid","createdAt")  VALUES(gen_random_uuid(),${userId},${seatId},${eventId},'CONFIRMED'::"BookingStatus",${query[0].price},NOW())`
     
     await tx.$queryRaw`
    UPDATE "Seat" 
    SET status = 'BOOKED'::"SeatStatus"
    WHERE id = ${seatId}
  `

 return query[0];


})

 return res.status(200).json({
    message:"BOOKING CONFIRMED",
    eventName:bookingData.eventname,
    SeatNo:bookingData.seatNo,
    SeatType:bookingData.type,
    pricePaid:AmountPaid,
    ActualPrice:bookingData.price

  })



}catch(error){
   console.log(error.message);
 

    if (error.message === "SEAT_NOT_AVAILABLE") {
        return res.status(400).json({ message: "Seat is no longer available." });
    }
    if (error.message === "PRICE_MISMATCH") {
        return res.status(400).json({ message: "Amount paid does not match the ticket price." });
    }

    return res.status(500).json({ message: "Internal Server Error" });





}finally{
      await releaseLock(seatId, userId);

}
}
