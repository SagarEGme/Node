const express = require("express");
const URL = require("../models/index")


const {handleGenerateNewShortURl,handleGetAnalytics} = require("../controllers/url")

const router = express.Router();


router.get("/:short", async (req, res) => {
    try {
        const short = req.params.short;
        console.log("short", short);

        // Attempt to find and update the document
        const entry = await URL.findOneAndUpdate(
            { shortUrl: short },
            {
                $push: {
                    visitHistory: {
                        timeStamp: Date.now()
                    },
                }
            },
            { new: true } // Return the modified document
        );
        // If entry is found, redirect to the URL
        if (entry) {
            res.redirect(entry?.redirectUrl);
        } else {
            // If entry is not found, handle the error
            res.status(404).send("Short URL not found");
        }
    } catch (error) {
        // Handle any errors that occur during execution
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/",handleGenerateNewShortURl);

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;