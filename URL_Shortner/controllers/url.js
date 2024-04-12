const shortid = require("shortid")
const URL = require("../models")

async function handleGenerateNewShortURl(req, res) {
    const body = req.body;
    const allUrls = await URL.find({});
    if (!body.url) return res.status(400).json({ error: "Url must be supplied" })
    const shortID = shortid();

    await URL.create({
        shortUrl: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.render("home", { id: shortID, urls: allUrls })
    // return res.json({ id : shortID})
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortUrl: shortId });
    if (result) return res.json({
        totalClicks: result.visitHistory.length,
        redirectedTo: result.redirectUrl,
        analytics: result.visitHistory,
    });
}

async function handleSearchFromShortId(req, res) {
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
}
module.exports = {
    handleGenerateNewShortURl,
    handleGetAnalytics,
    handleSearchFromShortId
}