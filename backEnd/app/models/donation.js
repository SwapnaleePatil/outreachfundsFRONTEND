let mongoose = require('mongoose');
let donationSchema = new mongoose.Schema({
    eventDate:{
        type:String,
        required:true
    },
    donationDate:{
        type:String,
        required:true
    },
    eventId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    businessId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    organizationId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
});
let donation = mongoose.model('donation', donationSchema);
module.exports = {donation};
