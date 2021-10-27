const Admin = require("../models/admin");
const Tech = require('../models/techPost').Tech;
const Post = require('../models/blogPost').Post
const router = require("../routes/adminRoutes")
const User = require("../models/nhubBlog")



module.exports = {
    admin: async(req, res) => {
        await Tech.find({}, {'_id':1, _id:0}).sort({'_id':-1}).then((tech)=>{
            console.log(tech.week)
           res.render('admin.ejs', {tech});
        }).catch(err =>{
            console.log(err)
        });
    },
    blogPost: async(req, res)=>{
        const id = req.params.id
        const admin = req.admin
        console.log(id)
    await Post.findById(id).then((post)=>{
        const newPost = new Post({
            title: req.body.title,
            message: req.body.message,
            userName: admin.userName,
            status: req.body.status
            
        });

     newPost.save().then(async(post) =>{
         console.log(post);
         req.flash("success-message", "Post created successfuly");
         res.redirect("/admin");
     }).catch(err =>{
        console.log(err)
    });
})
           },

            

    deletePost: async(req, res)=> {
        id = req.params.id
       await Tech.findByIdAndRemove(id).then((tech)=>{
        res.redirect('/admin');
       }).catch(err=>{
           console.log(err)
       })
    
        
    }
    
    

};