// const http = require("http")
// const fs = require("fs")
// const url = require("url")

// const handler = (req,res)=>{
//     if(req.url === "/favicon.ico") return res.end();
//     console.log("request received" + req.url)
//     const log = `\n ${Date.now()} log received for ${req.url}`

//     // search querry and parameter
//     const myUrl = url.parse(req.url, true)
//     console.log(myUrl)


//     switch(myUrl.pathname){ 
//         // creating response for multiple pages☻
//         case '/':
//             res.end("home page")
//             break;
//         case '/about':
//             const username = myUrl.query.name;
//             const job = myUrl.query.job;
//             res.end(`hello ${username}. Are you interested in ${job}?`)
//             break;
//         case '/signup':
//             // http handle methods: get, post, put,patch, delete etc.
//             if(req.method === "GET") res.end("Fill up the form")
//             else if(req.method === "POST") res.end("Success.")
//         default:
//             res.end("404 error")
//     }



//     fs.appendFile("./hello.txt", log , (err,data)=>{
//         res.end("data written in file" + log);
//     });
// }

// const myserver = http.createServer(handler);

// myserver.listen(8000,()=>console.log("server started"))

// for express 
const express = require("express")
const app = express();

app.get("/", (req,res)=>{
    res.send("hello from home page")
})
app.get("/about",(req,res)=>{
    return res.send(`hello ${req.query.name}. Your job is ${req.query.job}`)
})

app.listen(8000,()=>console.log("server started"))
