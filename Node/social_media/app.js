"use strict"
const express = require('express');
const app = express();
const request = require("request");
app.get("/",(req,res,next)=>{
  res.send("Hello World");
  res.end("Request to root was made");
})
console.log("Listening on port 8000");
app.listen(8000);
