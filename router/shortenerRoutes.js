import { Router } from "express";
import {shortenerURLController, getshortURL, redirectShortURL} from "../controller/shortenerURLController.js";

// Initialize router
const router = Router();
export default router;


/* -------------------- ROUTES -------------------- */
// Home page
router.get("/", getshortURL);

// Create short URL
router.post("/", shortenerURLController);

// Redirect short URL
router.get("/:shortURL", redirectShortURL);
