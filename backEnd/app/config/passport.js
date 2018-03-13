let Student=require('../models/student').student;
let LocalStrategy=require('passport-local').Strategy;

module.exports=(passport)=>{

    passport.serializeUser((stud,done)=>{
        studentToken=stud.tokens[0].token;
        return done(null,stud);
    })

    passport.deserializeUser((stud,done)=>{
        return done(null,stud);
    })

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
            return done(null,stud);
        }).catch((err)=>{
                console.log(err);
            })
    })
    )
}