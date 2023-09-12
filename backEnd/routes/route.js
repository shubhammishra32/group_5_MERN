import express from "express";
import { getAllCandidateDetails, 
        updateCandidateStatus, 
        mentorLogin,
        createinternship,
        getinternship,
        loginuser,
        registeruser,
        userapplyform} from "../controller/service.js";


const router = express.Router();

// mentor routes

router.post('/mentorlogin', mentorLogin);

router.post('/createinternship', createinternship)

router.get('/getinternship', getinternship)

router.get('/candidateDetails', getAllCandidateDetails);

router.get('/scandidate/:email/:status', updateCandidateStatus);

// user routes

router.post('/login', loginuser);

router.post('/register', registeruser);

router.post('/applyform', userapplyform)

export default router;