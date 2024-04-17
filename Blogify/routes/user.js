const {Router} = require("express");
const user = require("../models/user")

const router = Router();

router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.get("/signin",(req,res)=>{
    res.render("signin")
})

router.post("/signup",(req,res)=>{
    const {fullName,email,password} = req.body;
    user.create({
        fullName,
        email,
        password,
    })
    return res.redirect("/")
})

router.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    const User = user.matchPassword(email,password);

    console.log("user",User)
    res.redirect("/")

})
module.exports = router;