const express = require("express");
const data = require("./MOCK_DATA.json")
const app = express();

// for mobile user -> They require data rather than JSON file which can undergo SSR/CSR in browsers
app.get("/users", (req,res)=>{
    const html = `
        <ul>
            ${data.map((user)=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})

// for browsers
app.get("/api/users",(req,res)=>{
    return res.json(data)
})

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
const PORT = 8000;

app.listen(PORT,()=>console.log("server started"))  