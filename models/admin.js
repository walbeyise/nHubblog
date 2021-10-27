const mongoose = require("mongoose");

const {Schema} = mongoose;

const adminSchema = new Schema({
 Username: {
     type: String,
     required: true
 },
 password: {
     type: String,
     required: true
 },
 userType: {
     type: String,
     required: true
 } 
   
});

module.exports = Admin = mongoose.model("admin", adminSchema)