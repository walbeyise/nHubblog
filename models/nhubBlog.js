const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    fullName:{ type: String,
               required: true},
    Username: {type: String,
               required: true,
                unique: true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    userType: {
        type: String,
        required: true
    }
    
});

module.exports = {User: mongoose.model("user", userSchema) };