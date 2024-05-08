const express = require("express");

const {connectToMongoDB}=require("./connect");
const URL= require("./models/url");
const path=require("path");

const urlRoute=require("./routers/url");
const staticRoute=require("./routers/staticRouter");
const userRoute=require("./routers/user");

const app= express();
const PORT=8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB Connected"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute)

app.set("view engine","ejs");
app.set("views",path.resolve("views"));

app.get("/test",async (req,res)=>{
    const allUrls= await URL.find({});
    return res.render("home",{
     urls:allUrls,
    });
});
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