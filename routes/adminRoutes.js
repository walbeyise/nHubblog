const express = require("express");
const router = express.Router();
const Post = require('../models/blogPost').Post;
const {isUserAuthenticated} = require("../config/customFunctions")

const {
admin,
blogPost,
deletePost
} = require("../controller/adminController")

const Admin = require("../models/admin");
const {User} = require("../models/nhubBlog");
const config = require("../config/configuration");
const Tech = require("../models/techPost").Tech;
const adminController = require("../controller/adminController");


router.get("/admin", admin);
router.post("/blogPost/:id", blogPost)
router.post('/delete/:id', deletePost)



module.exports = router;