const mongoose = require("mongoose");

const {Schema} = mongoose;

const postSchema = new Schema({
        title:{ 
                type: String,
                required: true,
                required: true
                },
        message: {
                type: String,
                required: true,
                unique: true
                },
        fullName: {
                 type: String,
                 required: true
                },

        creationDate: {
                type: Date,
                default: Date.now()
                },
        likes_count: {
                type: Number
                }
      
   
});

module.exports = {Post: mongoose.model("post", postSchema) };