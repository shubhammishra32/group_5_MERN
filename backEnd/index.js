import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 9002;

import router from "./routes/route.js";
import { logger } from "./config/logger.js";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://pradumn2999:wOIEFwtph9746jkp@cluster0.wwg30ja.mongodb.net/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    logger.info('DB connected')
});

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use('/', router);

app.listen(port,() => {
    logger.info(`Server is running on port ${port}`)
})