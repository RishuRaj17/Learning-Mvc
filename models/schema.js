const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
    },
    jobTitle:{
        type:String,
        require:true
    }

},{timestamps:true});

const emp = mongoose.model("employee",userSchema);

module.exports = emp;