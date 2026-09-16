import express from "express"
import {generateSeats } from "../controllers/seat.controller.js"
import {isAdmin} from "../middlewares/auth.middleware.js"

const generateSeatsrouter = express.Router()
/**
 * @openapi
 * /api/generateSeat:
 *   post:
 *     summary: Bulk Generate Seats for an Event Category (Admin Only)
 *     description: Creates multiple seat records in bulk for a specified event and seat category.
 *     tags: [Seats & Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - seatCategoryId
 *               - totalSeats
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "080ff502-3e4f-4945-8c45-126a58bd4b03"
 *               seatCategoryId:
 *                 type: string
 *                 example: "cat_vip_123"
 *               totalSeats:
 *                 type: integer
 *                 example: 50
 *               prefix:
 *                 type: string
 *                 description: Optional row/section prefix (e.g., 'V' for VIP)
 *                 example: "V"
 *     responses:
 *       201:
 *         description: Seats generated successfully in bulk
 *       400:
 *         description: Invalid input payload or missing parameters
 *       401:
 *         description: Unauthorized - Invalid or missing Access Token
 *       403:
 *         description: Forbidden - Requires Admin role
 */
generateSeatsrouter.post("/",isAdmin, generateSeats)

export default generateSeatsrouter