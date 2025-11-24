import express from "express";
import { sendContactMessage } from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/send").post(sendContactMessage);

export default router;
