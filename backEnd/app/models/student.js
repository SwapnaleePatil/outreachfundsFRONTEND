let mongoose = require('mongoose');
let validator = require('validator');
let schoolOrganisation=require('./schoolOrganisation').schoolOrganisation;
let jwt=require('jsonwebtoken');
let studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 3
    },
    lastName: {
        type: String,
        require: true,
        minlength: 3
    },
    gender: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        validator: validator.isEmail,
        message: '{value} is not valid'
    },
    phone: {
        type: String,
        minlength: 6,
        maxlength: 13,
        require: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 32,
        require: true,
        trim: true
    },
    photo: {
        type: String
    },
    status: {
        type: Boolean,
        default:false
    },
    role: {
        type: String,
        require: true
    },
    roleTitle: {
        type: String
    },
    roleStatus:{
        type:Boolean,
        default:false
    },
    schoolId:{
        type:mongoose.Schema.ObjectId,
        ref:schoolOrganisation,
    }


});


studentSchema.statics.findByToken= function(token){
    let Student =this;
    let decoded;
    try{
        decoded=jwt.verify(token,'outreachfunds');
    }catch(err) {
        return err;
    }
    return Student.findOne({
        _id:decoded._id,
        email:decoded.email,
        password:decoded.password
    })
}

let student = mongoose.model('student', studentSchema);
module.exports = {student};
