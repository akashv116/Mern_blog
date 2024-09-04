import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.route.js";
import authRoutes  from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import cookieParser from "cookie-parser";
// import commentRoutes from './routes/comment.route.js';
import commentRoutes from "./routes/comment.route.js"
import path from 'path';
import cors from 'cors'

const app=express(); 

const __dirname=path.resolve();

app.use(cors())
app.use(express.json());
app.use(cookieParser());

import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{

    console.log("Mongodb is connected");

}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

app.use("/api/user",UserRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes)
app.use("/api/comment",commentRoutes);
// app.use("/api/comment",commentRoutes);
// app.use("/api/comment",commentRoutes);
  app.use(express.static(path.join(__dirname,'/client/dist')));
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
  })
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||"Internal server error";
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})
