let mongoose = require('mongoose');
let validator = require('validator');


let schoolOrganisationSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        require: true
    },
    organisationName: {
        type: String,
        require: true
    },

    organisationAddress: {
        type:String,
        require:true
    },

    organisationEmail: {
        type: String,
        require: true,
        trim: true,
        validator: validator.isEmail,
        message: '{value} is not valid'
    },
    organisationContact: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 13
    }
});
let schoolOrganisation = mongoose.model('schoolOrganisation', schoolOrganisationSchema);
module.exports = {schoolOrganisation};

