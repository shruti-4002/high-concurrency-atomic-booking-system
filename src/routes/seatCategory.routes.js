import express from "express"
import { createSeatCategory } from "../controllers/seatCategory.controller.js"
import {isAdmin} from "../middlewares/auth.middleware.js"

const seatCategoryrouter = express.Router()
/**
 * @openapi
 * /api/seatCategory/create:
 *   post:
 *     summary: Create a Seat Category for an Event (Admin Only)
 *     description: Defines pricing, name, and total capacity for a specific seat section (e.g., VIP, Gold, Economy).
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
 *               - categoryName
 *               - price
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "080ff502-3e4f-4945-8c45-126a58bd4b03"
 *               categoryName:
 *                 type: string
 *                 example: "VIP"
 *               price:
 *                 type: number
 *                 example: 5000
 *               totalSeats:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Seat category created successfully
 *       400:
 *         description: Invalid payload parameters
 *       401:
 *         description: Unauthorized - Access Token missing or invalid
 *       403:
 *         description: Forbidden - Admin privileges required
 */
seatCategoryrouter.post("/create",isAdmin, createSeatCategory)

export default seatCategoryrouter