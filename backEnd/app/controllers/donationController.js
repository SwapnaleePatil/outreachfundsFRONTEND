let Donation = require('./../models/donation').donation;
exports.addDonation=(req,res)=>{
    let newDonation = new Donation(req.body);
    newDonation.save().then((response)=>{
        res.send(response);
    }).catch((err)=>{
        res.status(400).send(err);
    })
};