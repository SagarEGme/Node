const express = require("express")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
const path= require("path")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const Blog = require("./models/blog")
const {checkForAuthenticationCookie}  = require("./middlewares/authentication")

const app = express()
const PORT = 8000; 

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

mongoose.connect("mongodb://localhost:27017/blogbook").then(()=> console.log("MongoDB connected"))

app.use("/users",userRoute)
app.use("/blogs",blogRoute)

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user : req.user,
        blogs:allBlogs,
    })
})

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))