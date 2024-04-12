const express = require("express");
const URL = require("../models/index")


const {handleGenerateNewShortURl,handleGetAnalytics, handleSearchFromShortId} = require("../controllers/url")

const router = express.Router();


router.get("/:short", handleSearchFromShortId);

router.post("/",handleGenerateNewShortURl);

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;