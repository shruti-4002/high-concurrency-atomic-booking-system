import express from "express"
import { createBooking } from "../controllers/Transaction.controller.js"
import { rateLimiterMiddleware } from '../middlewares/rateLimiter.middleware.js';

const Transactionrouter = express.Router()
/**
 * @openapi
 * /api/Transactions/createBooking:
 *   post:
 *     summary: Atomic Seat Booking with Distributed Lock & Rate Limiting
 *     description: >
 *       Executes a high-concurrency safe seat reservation. Uses a Redis Token Bucket rate limiter, 
 *       acquires a distributed Redis Lua lock, and runs a PostgreSQL atomic transaction (`SELECT FOR UPDATE`) 
 *       to prevent double-booking.
 *     tags: [Transactions & Concurrency]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seatId
 *               - eventId
 *               - AmountPaid
 *             properties:
 *               seatId:
 *                 type: string
 *                 example: "38626cc0-03f9-4741-9b1e-566cb548cbcd"
 *               eventId:
 *                 type: string
 *                 example: "080ff502-3e4f-4945-8c45-126a58bd4b03"
 *               AmountPaid:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Booking confirmed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "BOOKING CONFIRMED"
 *               eventName: "BTS Live 2025"
 *               SeatNo: "V12"
 *               SeatType: "VIP"
 *               pricePaid: 5000
 *               ActualPrice: 5000
 *       400:
 *         description: Bad Request - Missing required parameters
 *       401:
 *         description: Unauthorized - Invalid or missing Access Token
 *       423:
 *         description: Locked - Seat is already locked or booked by another transaction
 *         content:
 *           application/json:
 *             example:
 *               message: "Seat is no longer available."
 *       429:
 *         description: Too Many Requests - Token bucket rate limit exceeded
 *         content:
 *           application/json:
 *             example:
 *               message: "Rate limit exceeded. Please try again later."
 */
Transactionrouter.post("/createBooking",rateLimiterMiddleware,createBooking )

export default Transactionrouter