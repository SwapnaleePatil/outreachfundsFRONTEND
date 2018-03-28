let BusinessOwner = require('../models/businessOwner').businessOwner;
const _=require('lodash')
let jwt=require('jsonwebtoken');

//Add new Business Owner And Business Detail
exports.addBusinessOwner = (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    let body=JSON.parse(req.body.obj);
    let sample = req.files.photo;
    sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
        if (err) {
            res.send(err);
        }
    });
    let cardDetail=body.subscription.cardDetail;
    let newBusinessOwner = new BusinessOwner(body);
    newBusinessOwner.subscription.cardDetail.securityCode=jwt.sign(cardDetail.securityCode,'outreachfunds');
    newBusinessOwner.subscription.cardDetail.cardNumber=jwt.sign(cardDetail.cardNumber,'outreachfunds');
    newBusinessOwner.photo=sample.name;
    newBusinessOwner.save()
    .then(() => {
        res.send({"message":'Inserted.', 'record': newBusinessOwner});
    })
    .catch((e) => {
        res.send({'error in inserting record.':e});
    })
}
//Delete Business Owner And Business Detail
exports.deleteBusinessOwner = (req, res) => {
    BusinessOwner.findByIdAndUpdate(req.body.id,{ $set:{status: 'true'}},{new:true}).then((result) => {
        if (result) {
            res.send({"message":'Deleted.', 'record': result});
        }
        else {
            res.send("User Not Found");
        }
    }).catch((e) => {
        res.send({'Error in deletion':e});
    })
}
//Update Business Owner And Business Detail
exports.updateBusinessOwner = (req, res) => {
    let img = '';
    let body=JSON.parse(req.body.obj);
    if (req.files && req.files !== null) {
        img = req.files.photo.name;
        let sample = req.files.photo;
        sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
            if (err) {
                res.send({"Error":err});
            }
        });
    }
    else {
        img = req.body.photo;
    }
    body.photo=img;

    BusinessOwner.findByIdAndUpdate(body.id,{$set:body},{new:true})
    .then((result) => {
        res.send({"message": 'Updated.', 'record': result});
    }).catch((err) => {
        res.send({'Error in Update': err});
    })
}
//Fetch All Record
exports.fetch = (req, res) => {
    BusinessOwner.find().then((data) => {
        res.send({"message":'All Record.', 'record': data});
    }).catch((err) => {
        res.send({'Error in retrieving data.': err});
    })
}
//Fetch Record By Id
exports.fetchById = (req, res) => {
    BusinessOwner.findById({_id:req.body.id}).then((data) => {
        res.send(data.businessInfo.businessName);
    }).catch((e) => {
        res.send({'Error in retrieving data.':e});
    })
};
//Fetch Record By Token
exports.fetchByToken=(req,res)=>{
    let token=req.header('x-auth');
    BusinessOwner.findByToken(token).then((result)=>{
        if(!result)
        {
            res.send({"message":"User Not Found"});
        }
        else
        {
            res.send({"message":"User Found",'User':result})
        }
    })
}