/* const http = require("http");

const server = http.createServer((req,res)=>{
    res.statusCode = 200;// Means everything is OK
    res.setHeader("Content-Type", "text/plain");//Describe what kind of information we are giving back
    res.end("Hello World");//response-what the user gets back
});

server.listen(3000,'127.0.0.1'); */

// console.log("Hello World");

// import {v4 as k} from "uuid";

// const {v4 : uuidV4} = require("uuid");

// console.log(uuidV4());

// console.log(k());

// const {v4 : uuidv4} = require('uuid');

// console.log (uuidv4());

const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.post('/',(req,res)=>{
    res.send('Post Request');
});

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
});


