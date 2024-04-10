const shortid = require("shortid")
const URL = require("../models")

async function handleGenerateNewShortURl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({ error : "Url must be supplied"})
    const shortID = shortid();

    await URL.create({
        shortUrl:shortID,
        redirectUrl : body.url,
        visitHistory:[]
    })
    
    return res.json({ id : shortID})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = URL.findOne({shortId});
    console.log(result.redirectUrl)
    return res.json({
        id : shortId,
        // totalClicks : result.visitHistory,
        redirectedTo : result.redirectUrl,
        // analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURl,
    handleGetAnalytics,
}