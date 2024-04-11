const shortid = require("shortid")
const URL = require("../models")

async function handleGenerateNewShortURl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url must be supplied" })
    const shortID = shortid();

    await URL.create({
        shortUrl: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.render("home", { id: shortID })
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

module.exports = {
    handleGenerateNewShortURl,
    handleGetAnalytics,
}