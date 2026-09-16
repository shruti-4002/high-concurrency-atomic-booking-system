import express from "express"
import { setupSwagger } from "./config/swagger.js"; 
import path from "path";
import eventrouter from "./routes/events.routes.js"
import cookieParser from "cookie-parser"
import seatCategoryrouter from "./routes/seatCategory.routes.js"
import Transactionrouter from "./routes/Transaction.routes.js"
import generateSeatsrouter from "./routes/seat.routes.js"
import authrouter from "./routes/auth.routes.js"
import { authmiddleware, isAdmin } from "./middlewares/auth.middleware.js";
import AccountSuspensionrouter from "./routes/AccountSuspension.routes.js"

import viewRoutes from "./routes/view.routes.js";

const app=express();
app.use(cookieParser());
app.use(express.json());


app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use("/", viewRoutes);

setupSwagger(app);
app.use("/api/auth",authrouter);


//ALL Protected Routes 
app.use("/api/events", eventrouter);
app.use("/api/seatCategory", authmiddleware, seatCategoryrouter);
app.use("/api/Transactions", authmiddleware, Transactionrouter);
app.use("/api/generateSeat", authmiddleware, generateSeatsrouter)

//admin route
app.use("/api/Account_Suspension",authmiddleware,isAdmin,AccountSuspensionrouter)

 export {app}

