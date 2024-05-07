const express=require("express");
const {handleGenerateNewShortUrl}=require("../controllers/url");
const {handleGetAnalytics}=require("../controllers/url")

const router= express.Router();

router.post("/",handleGenerateNewShortUrl);
router.get("/analytics/:shortId",handleGetAnalytics);

module.exports=router;