const express = require("express");
const URL = require("../models/index")

const {handleGenerateNewShortURl,handleGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.get("/:shortId", (req, res) => {
    const shortId = req.params.shortId;
    const entry = URL.findOneAndUpdate({ shortId },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                },
            }
        }
    );

    res.redirect("https://" + entry?.redirectUrl)
})

router.post("/",handleGenerateNewShortURl);

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;