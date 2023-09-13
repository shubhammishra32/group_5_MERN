import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routes/route.js";

mongoose.connect("mongodb+srv://pradumn2999:wOIEFwtph9746jkp@cluster0.wwg30ja.mongodb.net/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
});

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/', router);

app.listen(9002,() => {
    console.log("BE started at port 9002")
})