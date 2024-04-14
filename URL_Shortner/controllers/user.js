const user = require("../models/user");
const { setUser } = require("../service/auth");
const URL = require("../models/index")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await user.create({
        name,
        email,
        password
    })
    console.log("user signed up")
    return res.redirect("/")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const User = await user.findOne({ email, password })
    if (!User) {
        return res.render("login", {
            error: "invalid username or password"
        })
    }

   const token =  setUser(User);
    res.cookie("uid", token);

    console.log("user logged in")
    return res.redirect("/")
} 

module.exports = {
    handleUserSignUp,
    handleUserLogin
}