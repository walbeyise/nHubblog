const mongoose = require("mongoose");

const {Schema} = mongoose;

const likeSchema = new Schema({
        likes_count: {
                type: Number
        }
      
   
});

module.exports = {Like: mongoose.model("like", likeSchema) };