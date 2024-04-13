const {getUser} = require("../service/auth")

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = res.cookies?.uid;

    if(!userUid) return res.redirect("/login");
    
    const user = getUser(userUid)
    if(!user) return res.redirect("/login")

    req.user = user;
    next();
}
async function checkAuth(req,res,next){
    const userUid = res.cookies?.uid;

    
    const user = getUser(userUid)

    res.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
} 