const {User} = require("../models/nhubBlog");
const bycrypt = require("bcryptjs");
const router = require("../routes/defaultRoutes")
const Post = require('../models/blogPost').Post;
const Tech = require('../models/techPost').Tech;


module.exports = {
    index: (req, res) => {
        User.find().then(user=>{
            res.render("index.ejs", {user});
        }).catch(err=>{
            console.log(err);
        });
       

    },
    home: (req,res)=>{
        res.render("home.ejs");
    },

    profile: async(req, res) => {
        await User.findById(req.user.id).then((user)=>{
             //console.log(user)
           res.render('profile.ejs', {user:user})
        }).catch(err =>{
            console.log(err)
        });
    },
     registerGet: (req, res)=>{
         res.render('register.ejs')
     },
    registerPost: async(req, res) => {
    
User.findOne({email: req.body.email}, {Username: req.body.Username}).then(async(user) => {

    if(user){
        req.flash("error-message", "Email or Username already Exist");
        console.log("user exist...");
        return res.redirect("/login");
    }else{
        const newUser = await new User({
            fullName: req.body.fullName,
            Username: req.body.Username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            userType: "user"
            
        },
         await bycrypt.genSalt(10, async(err, salt) =>{
        await bycrypt.hash(newUser.password, salt, async(err, hash)=>{
            newUser.password = hash;

    console.log("this is the New User password after hash: ", newUser)
        
    await  newUser.save();
    req.flash("success-message", "Registration Successful");
    res.redirect("/login");
    
          });
    }));
    }
})

    },

    loginGet: (req, res) => {
        
        res.render("login.ejs");
        
    },
   
    dashboard: async(req, res) => {
        await Tech.find({}, {'_id':1, _id:0}).sort({'_id':-1}).then((tech)=>{
            console.log(post.title)
           res.render('technicalhome.ejs', {tech});
        }).catch(err =>{
            console.log(err)
        });
    },
    
    loginPost: (req, res)=>{
        //res.redirect("profile.ejs")
    },  
 
    
  
    posthome: async(req, res) => {
        await Post.find({}, {'_id':1, _id:0}).sort({'_id':-1}).then((post)=>{
            console.log(post.title)
           res.render('posthome.ejs', {post});
        }).catch(err =>{
            console.log(err)
        });
    },
    technicalhome: async(req, res) => {
        await Tech.find({}, {'_id':1, _id:0}).sort({'_id':-1}).then((tech)=>{
            console.log(tech)
           res.render('technicalhome.ejs', {tech});
        }).catch(err =>{
            console.log(err)
        });
    },  


    //Posting to blog

    blogPost: async(req, res)=>{
        const id = req.params.id
        const user = req.user
        console.log(id)
    await Post.findById(id).then((post)=>{
        const newPost = new Post({
            title: req.body.title,
            message: req.body.message,
            fullName: user.fullName,
            status: req.body.status
            
        });

     newPost.save().then(async(post) =>{
         console.log(post);
         req.flash("success-message", "Post created successfuly");
         res.redirect("/profile");
     }).catch(err =>{
        console.log(err)
    });
})
           },

           //posting technical report
           techPost: async(req, res)=>{
            const id = req.params.id
            const user = req.user
            console.log(id)
        await Tech.findById(id).then((tech)=>{
            const newTech = new Tech({
                week: req.body.week,
                message: req.body.message,
                fullName: user.fullName,
                status: req.body.status
            });
    
         newTech.save().then(async(tech) =>{
             console.log(tech);
             req.flash("success-message", "Technical report created successfuly");
             res.redirect("/profile");
         }).catch(err =>{
            console.log(err)
        });
    })
}

           
}
