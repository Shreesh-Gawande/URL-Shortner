const mongoose= require("mongoose");

const urlSchema=new mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true,
    },
    redirectedUrl:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        
    },
    visitedHistory:[{timestamp:{type:Number}}],

},
{timestamps:true},
);

const URL= mongoose.model("url",urlSchema);
module.exports=URL;