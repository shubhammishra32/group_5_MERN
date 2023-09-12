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

router.post('/mentorlogin', mentorLogin); //done

router.post('/createinternship', createinternship) //done

router.get('/getinternship', getinternship) //done

router.get('/candidateDetails', getAllCandidateDetails);

router.get('/scandidate/:email/:status', updateCandidateStatus);

// user routes

router.post('/login', loginuser); //done

router.post('/register', registeruser); //done

router.post('/applyform', userapplyform) //done

export default router;