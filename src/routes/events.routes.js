import express from "express"
import { createEvent } from "../controllers/events.controller.js"
import { getAllEvents,getEventAndSeatsCategory,searchEvents } from "../controllers/events.controller.js"
import {authmiddleware,isAdmin} from "../middlewares/auth.middleware.js"

const eventrouter=express.Router();


/**
 * @openapi
 * /api/events/create:
 *   post:
 *     summary: Create a new event [Admin Only]
 *     description: Restricted Endpoint. Requires System Admin authorization via Auth Cookie or Bearer Token.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - artist
 *               - city
 *               - venue
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Arijit Singh India Tour 2026"
 *               artist:
 *                 type: string
 *                 example: "Arijit Singh"
 *               city:
 *                 type: string
 *                 example: "Mumbai"
 *               venue:
 *                 type: string
 *                 example: "DY Patil Stadium"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-20T19:30:00Z"
 *     responses:
 *       201:
 *         description: Event created successfully
 *       401:
 *         description: Unauthorized - User Not Logged In or Token Missing
 *       403:
 *         description: Forbidden - Requires System Admin Role
 */
eventrouter.post("/create",authmiddleware,isAdmin,createEvent)

/**
 * @openapi
 * /api/events/getAllEvents:
 *   get:
 *     summary: list of all available events with Pagination 
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of events to return
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Cursor for pagination
 *     responses:
 *       200:
 *         description: Successfully fetched events
 */
eventrouter.get("/getAllEvents",getAllEvents)
/**
 * @openapi
 * /api/events/getEventAndSeatsCategory:
 *   get:
 *     summary: Fetch event details along with associated seat categories
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the event
 *     responses:
 *       200:
 *         description: Event and seat categories retrieved
 *       404:
 *         description: Event not found
 */
eventrouter.get("/getEventAndSeatsCategory",getEventAndSeatsCategory)
/**
 * @openapi
 * /api/events/search:
 *   get:
 *     summary: Search events using GIN Indexing
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword for event title or location
 *         example: "Arijit"
 *     responses:
 *       200:
 *         description: Search results returned successfully
 */
eventrouter.get("/search",searchEvents)
export default eventrouter;