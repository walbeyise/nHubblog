const express = require("express");
const router = express.Router();
const Admin = require('../models/admin')

const {index, 
       loginGet, 
       loginPost,
       profile, 
       registerGet,
       registerPost,
       blogPost, 
       techPost,
       posthome, 
       technicalhome, 
       home,
       dashboard
    } = require("../controller/defaultController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {User} = require("../models/nhubBlog");
const bcrypt = require("bcryptjs");
const config = require("../config/configuration");
const Post = require('../models/blogPost').Post;
const Tech = require('../models/techPost').Tech;



 
//home route
router.get('/index', index);

router.get('/', home);

// defining the local strategy
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, Username, password, done) => {
    User.findOne({ Username:Username }).then((user) => {
        if(!user){
            Admin.findOne({Username:Username}).then((admin)=>{
                if(!admin){
                    return done(null, false, req.flash("error-message", "invalid Username"))
                }
                bcrypt.compare(password, admin.password, (err, passwordMatched)=>{
                    if(err){
                        return err
                    }
                    if(!passwordMatched){
                        return done(null, false, req.flash("error-message", "Invalid password"))
                    }
                    return done(null,admin, req.flash('success-message', 'login successfully'))
                })
            })
        }
        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if(err){
                return err;
            }
            if(!passwordMatched){
                return done(null, false, req.flash("error-message", "Invalid password"));
            }      
            return done(null,user, req.flash('success-message', 'login successfully'))
            
      })
    })
  }))

//determines which data of the store object should be stored in the session
passport.serializeUser((user, done) =>{
       done(null, user.id);
   
   });
//use the data 'store.id' from "serializeUser" to get entire store object
passport.deserializeUser(async(id, done)=>{
    User.findById(id, function(err, user){
        if(!user){
            Admin.findById(id, function(err, admin){
                done(err, admin)
            })
        }else{
            done(err, user)
        }
    })
})

//login route
router.route("/login")
.get(loginGet)
.post(passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    successFlash: true,
    session: true
}), loginPost);


router.get('/logout', function(req, res){
    req.logout();
    req.flash('success-message', 'You are logged out');
    res.redirect('/');
  });

//profile route
//router.get('/profile', profile);

router.get('/profile', ensureAuthenticated, profile);

router.get('/dashboard', ensureAuthenticated, async(req, res, next)=>{
    if(req.user.userType ==='user'){
        return res.redirect('/profile');
    }
    else if(req.user.userType === 'admin'){
        return res.redirect('/admin');
    }else{
        return req.flash('error-message', 'No user found')
    }
})

/* GET home page. */

//register route
router.route("/register")
.get(registerGet)
.post(registerPost) 


//posthome route
router.get('/posthome', posthome);



//technical home route
router.get('/technicalhome', technicalhome);


router.post('/blogPost/:id', ensureAuthenticated, blogPost)


router.post('/techPost/:id', ensureAuthenticated, techPost)




//Access Control
function ensureAuthenticated(req, res, next){
if(req.isAuthenticated() ){
    return next();
    }else {
        req.flash("error-message", "Please Login First");
        res.redirect('/login')
 
    }
}


module.exports = router;
