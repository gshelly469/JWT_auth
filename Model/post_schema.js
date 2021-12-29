const mongoose = require('mongoose');

///ROUTES

const schema_followed = new mongoose.Schema({
    name_str : {
        type:String,
        required:true,
        minlength:10
    },
    date_name : {
        type:String,
        default:Date.now
    },
    mno : {
        type:Number,
        required:true,
        min:10
    },
    pass : {
        type:String,
        required:true,
        minlength:8
    }
});

module.exports = mongoose.model('Sub', schema_followed)
