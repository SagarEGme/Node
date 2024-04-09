const express = require("express");
// const data = require("./MOCK_DATA.json")
const mongoose = require("mongoose")
const app = express();
const fs = require("fs")

mongoose.connect("mongodb://127.0.0.1:27017/firstApp")
.then(()=>console.log("Mongoose connnected"))
.catch((err)=> console.log("error detected", err))

//schema for mongodb
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName : {
        type:String,
        required:false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    }
})

//model for mongodb
const User = mongoose.model("user",userSchema)

// app.get("/api/users/:uid",(req,res)=>{
//     const id = Number(req.params.uid);
//     const user = data.find((user)=>user.id === id)
    
//     res.json(user)
// })

// if we have to do work on the same route again and again
// then we can use this method:
app.route("/api/users/:uid").get((req,res)=>{
    const id = Number(req.params.uid);
    const user = data.find((user)=>user.id === id)
    res.json(user)
}).patch((req,res)=>{
    // edit user with id
    return res.json({status : "pending"})
}).post((req,res)=>{
    // post user with id
    return res.json({status : "pending"})
}).delete((req,res)=>{
    // delete user with id
    return res.json({status : "pending"})
})

// To receive data from frontend, use middleware(plugins)
app.use(express.urlencoded({extended : false}))

// we can create our own middlewares 
app.use((req,res,next)=>{
    // It will hold the response and it wont send response:userdata in this case
    // console.log("hello from middleware1")
    // return res.send("hello world");

    req.myName = "sagar" //This will now be accessible from anywhere
    next();
})
app.use((req,res,next)=>{
    fs.appendFile("logUser.txt",`\n ${Date.now()} : ${req.method} : ${req.path}`,(err,data)=>{
        next();
    })
})

// for mobile user -> They require data rather than JSON file which can undergo SSR/CSR in browsers
app.get("/users", async(req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user)=>`<li>${user.firstName}</li>`).join("")}
        </ul>
    `
    res.send(html)
})

// for browsers
app.get("/api/users",(req,res)=>{
    return res.json(data)
})

// app.post("/api/users",(req,res)=>{
//     const body= req.body;
//     data.push({id:data.length+1 ,...body})
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(data),(err,data)=>{

//         return res.json({status:"pending"})
//     })
// })


// for mongodb

app.post("/api/users",async(req,res)=>{
    const body= req.body;
    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        jobTitle:body.job_title,
        gender:body.gender,
    })
    console.log("result" , result)
    return res.status(201).json({ msg : "success"})
})
const PORT = 8000;

app.listen(PORT,()=>console.log("server started at " + PORT))  