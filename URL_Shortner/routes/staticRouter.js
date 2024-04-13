const express = require("express");
const URL = require("../models/index")
const {handleUserSignUp, handleUserLogin} = require("../controllers/user")



const router = express.Router();

router.post("/",handleUserSignUp);
router.post("/login",handleUserLogin)

router.get("/", async (req, res) => {
    // if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({});
    res.render("home", { urls: allUrls })
})

router.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.end(`
        <html>
        <body>
        <ul>
            ${allUrls.map((url) => `<li>${url.shortUrl} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join("")}
        </ul>
        </body>
        </html>
    `)

})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/login", (req, res) => {
    res.render("login")
})
module.exports = router;