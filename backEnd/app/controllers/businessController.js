let BusinessOwner = require('../models/businessOwner').businessOwner;
const _=require('lodash')
exports.addBusinessOwner = (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    var body=JSON.parse(req.body.obj);
    let sample = req.files.photo;
    sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
        if (err) {
            console.log("Error",err);
        }
    });
    var newBusinessOwner = new BusinessOwner(body);
    newBusinessOwner.photo=sample.name;
    newBusinessOwner.save()
    .then(()=>{
       return newBusinessOwner.generateAuthToken();
    })
    .then((token) => {
        res.header('x-auth',token).send({"message":'Inserted.', 'record': newBusinessOwner});
    })
    .catch((e) => {
        console.log('error in inserting record.',e);
    })
}
exports.deleteBusinessOwner = (req, res) => {
    BusinessOwner.findByIdAndUpdate(req.body.id,{ $set:{status: 'true'}},{new:true}).then((result) => {
        if (result) {
            res.send({"message":'Deleted.', 'record': result});
        }
        else {
            res.send("User Not Found");
        }
    }).catch(() => {
        console.log('Error in deletion');
    })
}
exports.updateBusinessOwner = (req, res) => {
    let img = '';
    let body=JSON.parse(req.body.obj);
    if (req.files && req.files !== null) {
        img = req.files.photo.name;
        let sample = req.files.photo;
        sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
            if (err) {
                console.log("Error",err);
            }
        });
    }
    else {
        img = req.body.photo;
    }
    body.photo=img;

    BusinessOwner.findByIdAndUpdate(body.id,{$set:body},{new:true})
    .then((result) => {
        console.log("result",result);
        res.send({"message": 'Updated.', 'record': result});
    }).catch((err) => {
        console.log('Error in Update', err);
    })
}
exports.fetch = (req, res) => {
    BusinessOwner.find().then((data) => {
        res.send({"message":'All Record.', 'record': data});
    }).catch((err) => {
        console.log('Error in retrieving data.', err);
    })
}
exports.fetchById = (req, res) => {
    BusinessOwner.findById({_id:req.body.id}).then((data) => {
        res.send(data.businessInfo.businessName);
    }).catch(() => {
        console.log('Error in retrieving data.');
    })
};
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