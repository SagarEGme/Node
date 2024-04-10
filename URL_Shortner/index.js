const express = require("express");

const urlRoute = require("./routes/url")
const app = express();
const PORT = 8001;
const { connectToMongoDB } = require("./connect")

app.use(express.json())

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("Error Occured: ", err))

app.use("/url", urlRoute);





app.listen(PORT, () => console.log("Server started at port: ", PORT))