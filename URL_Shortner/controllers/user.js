const user = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await user.create({
        name,
        email,
        password
    })
    return res.render("home")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const allUrls = await user.findOne({});
    const User = await user.findOne({ email, password })
    if (!User) {
        return res.render("login", {
            error: "invalid username or password"
        })
    }

    const sessionId = uuidv4();
    setUser(sessionId, User);
    res.cookie("uid", sessionId);

    return res.render("home")
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}