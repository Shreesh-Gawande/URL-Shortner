const express = require("express");
const urlRoute=require("./routers/url");
const {connectToMongoDB}=require("./connect");
const URL= require("./models/url");
const app= express();
const PORT=8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB Connected"));

app.use(express.json());
app.use("/url",urlRoute);

app.get("/url/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
      {
        shortUrl: shortID 
      },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now()
          }
        }
      }
    );
    if (entry) {
        res.redirect(entry.redirectedUrl);
    } else {
        res.status(404).send("URL not found");
    }
});

  

app.listen(PORT,()=> console.log("Server haas started at port 8001"));