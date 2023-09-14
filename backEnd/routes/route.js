import express from "express";
import {
  updateCandidateStatus,
  mentorLogin,
  createinternship,
  getinternship,
  loginuser,
  registeruser,
  userapplyform,
  getCandidateDetails,
  deleteInternship,
} from "../controller/service.js";

import { logger } from "../config/logger.js";


const router = express.Router();

router.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
})
// mentor routes

router.post("/mentorlogin", mentorLogin); //done

router.post("/createinternship", createinternship); //done

router.get("/getinternship", getinternship); //done

router.get("/candidateDetails/:email/:internshipId", getCandidateDetails);

router.put("/scandidate/:internshipId", updateCandidateStatus);

router.delete("/deleteinternship/:internshipId", deleteInternship);

// user routes

router.post("/login", loginuser); //done

router.post("/register", registeruser); //done

router.post("/applyform", userapplyform); //done

export default router;
