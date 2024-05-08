const User= require("../models/urer");

async function handleUserSignup(req,res){
    const {name,email,password}= req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}
module.exports={
    handleUserSignup,
}