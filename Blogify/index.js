const express = require("express")
const mongoose = require("mongoose")
const path= require("path")
const userRoute = require("./routes/user")

const app = express()
const PORT = 8000;

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended:false}));

mongoose.connect("mongodb://localhost:27017/blogbook").then(()=> console.log("MongoDB connected"))

app.use("/users",userRoute)
app.get("/",(req,res)=>{
    res.render("home")
})

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))