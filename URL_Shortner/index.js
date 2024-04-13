const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser")
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const PORT = 8001;

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/userRoute")

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

const { connectToMongoDB } = require("./connect");
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("Error Occured: ", err))

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/",  staticRoute)
// app.use("/user",checkAuth, userRoute)

// app.post("/signup",handleUserSignUp)
// app.post("/login",handleUserLogin)


app.listen(PORT, () => console.log("Server started at port: ", PORT))