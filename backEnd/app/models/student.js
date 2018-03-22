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
    tokens:[{
        access: String,
        token: String
    }],
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

studentSchema.methods.generateAuthToken=function(){
    let stud=this;
    let access='auth';
    let token=jwt.sign({_id:stud._id.toHexString(),access},'outreachfunds').toString();
    stud.tokens.push({access,token});
    return stud.save().then(()=>{
        return token;
    })
}

studentSchema.statics.findByToken= function(token){
    var Student =this;
    var access='auth';
    var decoded;
    try{
       decoded=jwt.verify(token,'outreachfunds');
      }catch(err) {
        console.log("Error : ",err);
        return Promise.reject();
    }
    return Student.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':access
    })
}


let student = mongoose.model('student', studentSchema);
module.exports = {student};
