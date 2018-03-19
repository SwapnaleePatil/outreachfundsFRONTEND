let Donation = require('./../models/donation').donation;

exports.addDonation=(req,res)=>{
    let newDonation = new Donation(req.body);
    console.log('asd',req.body);
    newDonation.save().then((response)=>{
        console.log('response',response);
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
        console.log('response by approveDonation : ',response);
        res.send(response);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    })
}
exports.updateDonation=(req,res)=>{
    "use strict";
    Donation.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true}).then((response)=>{
        console.log('update response',response);
        res.send(response);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
};