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
} from "../controller/service.js";

const router = express.Router();

// mentor routes

router.post("/mentorlogin", mentorLogin); //done

router.post("/createinternship", createinternship); //done

router.get("/getinternship", getinternship); //done

router.get("/candidateDetails/:email/:internshipId", getCandidateDetails);

router.put("/scandidate/:internshipId", updateCandidateStatus);

// user routes

router.post("/login", loginuser); //done

router.post("/register", registeruser); //done

router.post("/applyform", userapplyform); //done

export default router;
