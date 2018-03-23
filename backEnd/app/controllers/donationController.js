let Donation = require('./../models/donation').donation;

exports.addDonation=(req,res)=>{
    let newDonation = new Donation(req.body);
    newDonation.save().then((response)=>{
        res.send(response);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    })
};
exports.getDonation=(req,res)=>{
    Donation.find({}).then((response)=>{
        res.send(response);
    }).catch((err)=>{
        res.status(400).send(err);
    })
};
exports.approveDonation=(req,res)=>{
    Donation.findByIdAndUpdate(req.body._id,{$set:{"status":true}},{new:true}).then((response)=>{
        res.send(response);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    })
}
exports.updateDonation=(req,res)=>{
    "use strict";
    Donation.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true}).then((response)=>{
        res.send(response);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
};