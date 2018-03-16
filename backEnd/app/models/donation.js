let mongoose = require('mongoose');
let donationSchema = new mongoose.Schema({
    date:{
        type:String,
        require:true
    },
    eventName:{
        type:String,
        require:true
    },

    organizationName:{
        type:String,
        require:true
    },
    location:{
        type:String,
        required:true
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
