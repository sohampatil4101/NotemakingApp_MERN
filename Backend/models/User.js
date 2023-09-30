const mongoose = require('mongoose');
const Schema = mongoose
const ROLE ={
    ADMIN:"ADMIN",
    USER:"USER",
    AUTHERITY:"AUTHERITY"
}
const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: Number,
        required: true
    },
    guardian:{
        type: Number
    },
    address:{
        type: String,
        required: true
    },
    isactive:{
        type: Boolean,
        default: false
    },

    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});

const User = mongoose.model('user', UserSchema);
module.exports = User