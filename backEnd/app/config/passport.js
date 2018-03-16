let Student=require('../models/student').student;
let businessOwner=require('../models/businessOwner').businessOwner;
let LocalStrategy=require('passport-local').Strategy;
let bcrypt=require('bcryptjs');
module.exports=(passport)=>{

    passport.serializeUser((user,done)=>{
        return done(null,user);
    })

    passport.deserializeUser((user,done)=>{
        return done(null,user);
    })

    //Student
    passport.use('student',new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },(username,password,done)=>{
            Student.findOne({email:username}).then((stud)=>{
            if(!stud){
                return done(null,false);
            }
            if(password!==stud.password){
                return done(null,false);
            }
                studentToken=stud.tokens[0].token;

                return done(null,stud);
        }).catch((err)=>{
                console.log(err);
            })
    })
    )

    //Business
    passport.use('businessOwner',new LocalStrategy((username, password, done) => {
        console.log('UserName and Password is:', username, password);
        businessOwner.findOne({email: username}, (err, user) => {
            if (err) {
                console.log("Error", err);
            }
            if (!user) {
                console.log("Not Get User");
                return done(null, false)
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log("Error Found",err);
                    }
                    if (result) {
                        token = user.tokens[0].token;
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                })
            }
        })
    }))
}