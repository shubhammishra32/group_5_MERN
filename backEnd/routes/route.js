import express from "express";
import { getAllCandidateDetails, 
        updateCandidateStatus, 
        loginController, 
        registerController, 
        mentorLogin} from "../controller/service.js";


const router = express.Router();

router.get('/mentorlogin', mentorLogin);

router.get('/candidateDetails', getAllCandidateDetails);

router.get('/scandidate/:email/:status', updateCandidateStatus);

router.post('/login', loginController);

router.post('/register', registerController);

export default router;