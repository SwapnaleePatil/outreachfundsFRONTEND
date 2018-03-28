let nodemailer = require('nodemailer');
let emailExistence = require('email-existence');
let Student=require('../models/student').student;
let BusinessOwner=require('../models/businessOwner').businessOwner;


exports.BusinessforgotPassword=(req,res)=>{

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
        html: `<a href=http://192.168.200.80:3006/businessforgotPassword/${req.body.email}>Click Here for New Password!</a>` // html body
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

exports.GetBusinessIdFromEmail=(req,res)=>{
    "use strict";
    BusinessOwner.findOne({'email':req.body.email}).then((response)=>{
        if(response){
            response.password=req.body.newPassword;
            response.save().then((doc)=>{
                return res.send(doc);
            })
        }
        else
        {
            return res.send('User Not Found');
        }
    })
};

