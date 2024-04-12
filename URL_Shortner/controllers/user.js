const user = require("../models/user")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await user.create({
        name,
        email,
        password
    })
    res.redirect("/")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const User = await user.findOne({ email, password })
    if (!User) {
        return res.render("login", {
            error: "invalid username or password"
        })
    }
    res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}