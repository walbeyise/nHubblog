const Admin = require("../models/admin");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoDB = require('../config/configuration')

//configure mongoose to connect to mongodb
mongoose.connect("mongodb://localhost/nhub-interns1", {useUnifiedTopology: true })
.then(response => console.log(`Database connected successfully on:`))
.catch(err => console.log(`connection db error: ${err}`))


const admin = new Admin({
    Username: "admin",
    password: "123456",
    userType: "admin"
});

 bcrypt.genSalt(10, async(err,salt)=>{useUnifiedTopology: true 
    await bcrypt.hash(admin.password, salt, async(err, hash)=>{
        admin.password = hash;

        admin.save().then(()=>{
            console.log('user saved')
        }).catch(err=>{
            console.log(err)
        })

    })
})



