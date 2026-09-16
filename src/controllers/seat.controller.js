import prisma from "../config/db.js";

export const generateSeats=async(req,res)=>{
  try{

        
        const atTime=40;
      const{numSeat,EventName,CategoryType}=req.body;


        //so take required feilds from tables and join them based on foergin keys
    const query1=await prisma.$queryRaw`Select "Event".id,"SeatCategory".id as c FROM "Event" INNER JOIN "SeatCategory" ON "Event".id="SeatCategory"."eventId" Where "Event".name=${EventName} AND "SeatCategory".type=${CategoryType}`
        
    if (query1.length === 0) {
            return res.status(404).json({ 
                error: "Data does not match." 
            });
        }
    
          
    let currentSeat=0;

    while(currentSeat!=numSeat){
         const seatarr=[];
        
    for(let i=0;i<atTime;i++){

        if(currentSeat==numSeat)break;

        seatarr.push({
            seatNo:`${CategoryType[0].toUpperCase()}${currentSeat+1}`,
            status:"AVAILABLE",
            categoryId:query1[0].c
        })
        currentSeat++;
    }

    const result=await prisma.seat.createMany({
        data:seatarr,
        skipDuplicates:true
    })
}
     res.status(201).json({
            success: true,
            message: `${currentSeat} seats successfully created`
        });

    

  }catch(error){
    console.error("Error:", error.message);
        res.status(500).json({ error: "seats cant be generated" });
  }

}