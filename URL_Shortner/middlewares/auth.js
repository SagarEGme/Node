const {getUser} = require("../service/auth")

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login")
    
    const userr = getUser(userUid)
    if(!userr) {
        console.log("no useruid found")

    }  

    req.user = userr; 
    console.log("correct user")
    next();
}
async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
 
    
    const uuser = getUser(userUid)

    req.user = uuser;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
} 