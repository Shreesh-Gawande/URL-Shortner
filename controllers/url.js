const shortid=require("shortid");

const URL=require("../models/url");

async function handleGenerateNewShortUrl (req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({err:"BAd request"});
    const shortID=shortid();
    await URL.create({
        shortUrl:shortID,
        redirectedUrl:body.url,
        visitedHistory:[],
    })

    return res.json({id:shortID});
}
module.exports={
    handleGenerateNewShortUrl
}