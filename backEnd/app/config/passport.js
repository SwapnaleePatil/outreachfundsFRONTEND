let Student = require('../models/student').student;
let businessOwner = require('../models/businessOwner').businessOwner;
let LocalStrategy = require('passport-local').Strategy;
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const configAuth = require('./auth');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        return done(null, user);
    })
    passport.deserializeUser((user, done) => {
        return done(null, user);
    })
    //Student
    passport.use('student', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (username, password, done) => {
            Student.findOne({email: username}).then((stud) => {
                if (!stud) {
                    return done(null, false);
                }
                if (password !== stud.password) {
                    return done(null, false);
                }
                if (stud.roleStatus === true) {
                    token = jwt.sign({
                        _id: stud._id,
                        email: stud.email,
                        password: stud.password
                    }, 'outreachfunds', {expiresIn: '1d'})
                    return done(null, stud);
                }
                return done(null, false);
            }).catch((err) => {
                return done(null, err);
            })
        })
    )

    //Passport Authentication For Business Owner
    passport.use('businessOwner', new LocalStrategy((username, password, done) => {
        businessOwner.findOne({email: username}, (err, user) => {
            if (err) {
                return done(null, err);
            }
            if (!user) {
                return done(null, false)
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return done(null, err);
                    }
                    if (result) {
                        token = jwt.sign({
                            _id: user._id,
                            email: user.email,
                            password: user.password
                        }, 'outreachfunds', {expiresIn: '1d'});
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                })
            }
        })
    }))

    //Google Login
    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                businessOwner.findOne({'email': profile.emails[0].value}, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        googleToken = jwt.sign({
                            email: profile.emails[0].value
                        }, 'outreachfunds', {expiresIn: '1d'});
                        console.log("Google token",googleToken)
                        if (user) {
                            return done(null, user);
                        } else {
                            console.log("Profile", profile);
                            let newUser = new businessOwner({
                                id: profile.id,
                                firstName: profile.givenName,
                                lastName: profile.familyName,
                                gender: profile.gender,
                                photo: profile.photos[0].value,
                                email: profile.emails[0].value // pull the first email
                            });
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    }
                );
            });

        }));

}