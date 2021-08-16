const express = require('express');
const server = express();
const actions = require("./actions/actions-router");
const projects = require("./projects/projects-router");

//middlewares
server.use(express.json());


// routes
server.use("/api/actions",actions);
server.use("/api/projects",projects);

// err handling
server.use((err,req,res,next)=>{
    // res.status(500).json({message:err.toString(),req})
    res.status(500).json({message:err.message,req});
});
server.get("/",(req,res)=>res.status(200).json({message:"server is running"}));
module.exports = server;
