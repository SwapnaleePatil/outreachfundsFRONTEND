let nodemailer = require('nodemailer');
let emailExistence = require('email-existence');
let Student=require('../models/student').student;
let BusinessOwner=require('../models/businessOwner').businessOwner;

exports.StudentforgotPassword=(req,res)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        secure:false,
        auth:{
            user:'lanetteam.parth29@gmail.com',
            pass:'lanetteam1'
        }
    });
    let mailOptions = {
        from: '"Modi 👻" <modi@baap.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<a href=http://localhost:3000/studentforgotPassword/${req.body.email}>Click Here for New Password!</a>` // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('failed');
        }
        else
        {
            res.send(info);
        }
    });
}
exports.BusinessforgotPassword=(req,res)=>{
    let a =false;
    emailExistence.check(req.body.email, function(error, response){
        console.log('resppnse check : '+response);
        a = true;
    });
    let transporter = nodemailer.createTransport({
        service:'gmail',
        secure:false,
        auth:{
            user:'lanetteam.parth29@gmail.com',
            pass:'lanetteam1'
        }
    });
    // `/businessforgotPassword/${this.state.email}`
    let mailOptions = {
        from: '"Modi 👻" <modi@baap.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<a href=http://localhost:3000/businessforgotPassword/${req.body.email}>Click Here for New Password!</a>` // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('failed');
        }
        else if(a){
            console.log('Invalid');
            res.send('Invalid');
        }
        else
        {
            res.send(info);
        }
    });
}

exports.GetStudentIdFromEmail=(req,res)=>{
    "use strict";
    console.log(req.body.email);
    Student.find({'email':req.body.email}).then((response)=>{
        if(response){
            response.password=req.body.newPassword;
            response.save().then((doc)=>{
                return res.send(doc);
            });
        }
        else
        {
            return res.send('User Not Found');
        }
    }).catch((err)=>{
        res.send(err);
    })
};
exports.GetBusinessIdFromEmail=(req,res)=>{
    "use strict";
    BusinessOwner.findOne({'email':req.body.email}).then((response)=>{
        if(response){
            console.log('response is : ',response.password);
            response.password=req.body.newPassword;
            response.save().then((doc)=>{
                console.log(doc);
                return res.send(doc);
            })
        }
        else
        {
            return res.send('User Not Found');
        }
    })
};
/*
exports.updatePassword=(req,res)=>{
    "use strict";
    Student.findByIdAndUpdate(req.body._id,{$set:{'password':req.body.password}},{new:true}).then((response)=>{
        if(response){
            console.log(response);
            return res.send(response);
        }
        else
        {
            BusinessOwner.findByIdAndUpdate(req.body._id,{$set:{'password':req.body.password}},{new:true}).then((response)=>{
                console.log(response);
                return res.send(response);
            })
        }
    }).catch((err)=>{
        console.log(err);
    })
};*/
