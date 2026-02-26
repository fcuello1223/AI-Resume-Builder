import express from "express";

import upload from "../config/multer.js";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);
resumeRouter.put("/update", upload.single("image"), protect, updateResume);

export default resumeRouter;
