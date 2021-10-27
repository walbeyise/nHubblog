const mongoose = require("mongoose");

const {Schema} = mongoose;

const techSchema = new Schema({
        week:{  
            type: String,
            required: true,
            required: true
},
        message: {
            type: String,
            required: true,
            unique: true
},
        creationDate: {
            type: Date,
            default: Date.now()
 },
        fullName: {
           type: String,
           required: true
}
   
});

module.exports = {Tech: mongoose.model("tech", techSchema) };