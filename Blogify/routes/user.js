const { Router } = require("express");
const user = require("../models/user");

const router = Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const newUser = await user.create({
            fullName,
            email,
            password,
        });
        console.log("New user created:", newUser);
        return res.redirect("/");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await user.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error("Error signing in:", error);
        return res.render("signin", {
            error: "Incorrect email or password",
        });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

module.exports = router;
