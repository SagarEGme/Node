const express = require("express");
const URL = require("../models/index")


const router = express.Router();

router.get("/",(req,res)=>{
    res.render("home")
})

router.get('/test',async (req,res)=>{
    const allUrls = await URL.find({});
    return res.end(`
        <html>
        <body>
        <ul>
            ${allUrls.map((url)=>`<li>${url.shortUrl} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join("")}
        </ul>
        </body>
        </html>
    `)

})
module.exports = router;