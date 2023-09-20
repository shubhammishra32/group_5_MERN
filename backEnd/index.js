import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routes/route.js"; 
import e from "express";

mongoose.connect("mongodb+srv://pradumn2999:wOIEFwtph9746jkp@cluster0.wwg30ja.mongodb.net/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
  console.log(err);
    console.log("DB connected")
});

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use('/', router);

app.listen(9002,() => {
    console.log("BE started at port 9002")
})