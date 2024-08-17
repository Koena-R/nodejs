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
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())
const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
/* const dotenv = require("dotenv");
dotenv.config();  */  
const Customer = require('./models/customer');

const json= {
    "name":"Koena",
    "age":23,
    "id":""
};

const customer = new Customer({
    name: "caleb",
    industry: "marketing"
});

//customer.save();

app.get('/',(req,res)=>{
//    res.send({"data":json});
    res.send("welcome");
});

app.post('/api/customers', async (req,res)=>{
    try{
        console.log(req.body);
        const customer = new Customer(req.body);
        const result = await customer.save();
        res.send(result)
    } catch(e){
        res.status(400).json({error: e.message});
    }
});

app.get('api/customers', async (req,res)=>{
    try{
        const result = await Customer.find();
        res.status(200).json({result});
    }catch(e){
        res.status(400).json({error:e.message});
    }
});

app.get('/api/customers/:id/:name', async (req,res) =>{
    try{
        //const result = await Customer.find();
        //res.send(result);
        console.log({
            requestParams:req.params,
            requestQuery:req.query
        });
        const customerId = req.params.id;
        const customerName = req.params.name;
        const result = await Customer.findOne({name:customerName});
        const result2 = await Customer.findById(customerId);
        res.json({result,result2});
    }
    catch(e){
        res.status(500).json({error: e.message});
        console.error(e);
    }
});

app.get('/api/customers/:id',async (req,res)=>{
    try{
        const customerId = req.params.id;
        const result = await Customer.findById(customerId);
        res.status(200).json({result});
    }catch(e){
        res.status(400).json({error : e.message});
    }
});

app.put('/api/customers/:id', async (req,res)=>{
    try{
        const customerId = req.params.id;
        //const result = await Customer.replaceOne({_id : customerId},{name : 'Koena', industry : 'FullStack Developer'});
        const result = await Customer.findOneAndReplace({_id : customerId},{name : 'Jacob', industry : 'Architecture'},{new : true});
        res.status(200).json({result});
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
});

app.patch('/api/customers/:id', async (req,res)=>{
    try{
        const customerId = req.params.id;
        const result = await Customer.findOneAndUpdate({_id: customerId},req.body, {new: true});
        res.status(200).json({result});
    } catch(e) {
        res.status(400).json({Error: e.message});
    }
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
