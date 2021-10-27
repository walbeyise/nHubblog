module.exports = {
    PORT: process.env.PORT || 9090,
    mongoDB: "",
        useMongoClient: true,
    
    globalVariables:(req, res, next) => {
       // res.locals.flash = req.flash();
        res.locals.success_message = req.flash("success-message");
        res.locals.error_message = req.flash("error-message");
        res.locals.messages = require("express-messages");
        res.locals.user = req.user ? true: false //? true: false;
        res.locals.session = req.session;

        next();
    }
}

