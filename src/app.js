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
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
/* const dotenv = require("dotenv");
dotenv.config();  */                    
const json= {
    "name":"Koena",
    "age":23,
    "id":""
};

app.get('/',(req,res)=>{
    res.send({"data":json});
});

app.post('/submit/api',(req,res)=>{
    res.send(req.body);
    console.log(req.body);
});


if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;
const start = async()=>{
    try{
        await mongoose.connect(CONNECTION);
        app.listen(PORT,()=>{
            console.log(`App listening on port ${PORT}`);
        });
    }
    catch(e){
        console.log(e);
    }
};

start();
