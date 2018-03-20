let mongoose = require('mongoose');
let businessOwner = require('./businessOwner').businessOwner;
let schoolOrganisation = require('./schoolOrganisation').schoolOrganisation;
let eventSchema = new mongoose.Schema({
    eventDate: {
        type: Date,
        require: true
    },
    eventName: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    eventTime: {
        type: String
    },
    businessSponsor:
        {
            type: Array,
            require: true

        },
    schoolOrganisation: {
        type: mongoose.Schema.ObjectId,
        ref: schoolOrganisation,
        require: true
    },
    fundraisingOption: {
        type: String,
    },
    donationOption: {
        type: String
    },
    accept: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
});
let eventSchedule = mongoose.model('eventSchedule', eventSchema);
module.exports = {eventSchedule};
