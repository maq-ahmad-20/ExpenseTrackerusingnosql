const jwt = require("jsonwebtoken");
const User = require('../model/user')

module.exports.authentiateUser = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const usertoken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(usertoken) //{userid:1 , iat:value}
        User.findById(usertoken.userid).then((user) => {
            console.log(user)
            req.user = user;
            console.log("middlewareauthsuccessfullysendingUserinrequest")
            next();
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
};


