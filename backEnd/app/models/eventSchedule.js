let mongoose = require('mongoose');
let businessOwner=require('./businessOwner').businessOwner;
let validator = require('validator');

let eventSchema = new mongoose.Schema({
    eventDate:{
        type:Date,
        require:true
    },
    eventName:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    eventTime:{
        type:String
    },
    businessSponsor:{
        type:mongoose.Schema.ObjectId,
        ref:businessOwner,
        require:true
    },
    status:{
        type:Boolean,
        default:false
    }
});
let eventSchedule = mongoose.model('eventSchedule', eventSchema);
module.exports = {eventSchedule};
