import express from "express"
import { AccountSuspension } from "../controllers/AccountSuspension.controller.js"


const AccountSuspensionrouter = express.Router()
/**
 * @openapi
 * /api/Account_Suspension:
 *   post:
 *     summary: Suspend or Unsuspend User Account
 *     description: Restricted endpoint for Admin users to manage account access statuses.
 *     tags: [Admin Actions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userToBeSuspendedId
 *               - isSuspended
 *             properties:
 *               userToBeSuspendedId:
 *                 type: string
 *                 example: "usr_8921a4"
 *               isSuspended:
 *                 type: boolean
 *                 example: true
 *               reason:
 *                 type: string
 *                 example: "Account flagged for suspicious automated booking activity."
 *     responses:
 *       200:
 *         description: Account status updated successfully.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT access token.
 *       403:
 *         description: Forbidden - Admin privileges required.
 *       404:
 *         description: Target user not found.
 */
AccountSuspensionrouter.post("/",AccountSuspension)

export default AccountSuspensionrouter