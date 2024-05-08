const User= require("../models/urer");

async function handleUserSignup(req,res){
    const {name,email,password}= req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res){
    const {name,email,password}= req.body;
    const user= await User.findOne({email,password});
    if(!user) return res.render("/login",{
        error:"invalid email or password"
    });
   
    return res.redirect("/");
}
module.exports={
    handleUserSignup,
    handleUserLogin,
}