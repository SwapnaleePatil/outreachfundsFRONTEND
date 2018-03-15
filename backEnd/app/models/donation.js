let mongoose = require('mongoose');
let businessOwner=require('./businessOwner').businessOwner;
let student=require('./student').student;
let eventSchedule=require('./eventSchedule').eventSchedule;
let donationSchema = new mongoose.Schema({
    eventId:{
        type:mongoose.Schema.ObjectId,
        ref:eventSchedule,
        require:true
    },
    businessSponsorId:{
        type:mongoose.Schema.ObjectId,
        ref:businessOwner,
        require:true
    },

    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:student,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    status:{
        type:Boolean,
        default:false
    }
});
let donation = mongoose.model('donation', donationSchema);
module.exports = {donation};
