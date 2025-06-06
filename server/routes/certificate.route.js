import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { generateCertificate, getCertificateByUserAndCourse } from "../controllers/certificate.controller.js";

const router = express.Router();

// Route to generate certificate (if not already exists)
router.route("/:courseId").post(isAuthenticated, generateCertificate);

// Route to fetch existing certificate for a user-course
router.route("/:courseId").get(isAuthenticated, getCertificateByUserAndCourse);

export default router;
