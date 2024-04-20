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
    try {
        const {email,password} = req.body;
    const token = await user.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect("/")
    } catch (error) {
        return res.render("login",{
            error:"Incorrect email or password"
        })
    }

})
module.exports = router;