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
async function handleGetAnalytics(req, res) {
    try {
        const shortUrl = req.params.shortUrl;
        const result = await URL.findOne({ shortUrl });

        if (!result) {
            return res.status(404).json({ error: "URL not found" });
        }

        const totalClicks = result.visitedHistory ? result.visitedHistory.length : 0;
        const analytics = result.visitedHistory || [];

        return res.json({
            totalClicks,
            analytics
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}