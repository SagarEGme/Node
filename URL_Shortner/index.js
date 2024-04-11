const express = require("express");
const path=require("path")
const URL = require("./models/index")


const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const app = express();
const PORT = 8001;
const { connectToMongoDB } = require("./connect")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("Error Occured: ", err))

app.use("/url", urlRoute); 
app.use("/",staticRoute)
// app.get("/test",staticRoute)





app.listen(PORT, () => console.log("Server started at port: ", PORT))