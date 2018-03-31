let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
//Schema For Business Owner With Business Detail
let businessOwnerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 3
    },
    lastName: {
        type: String,
        require: true,
        minlength: 3
    },
    gender: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        validator: validator.isEmail,
        message: '{value} is not valid',
        unique: true
    },
    phone: {
        type: String,
        minlength: 6,
        maxlength: 13,
        require: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 32,
        require: true,
        trim: true
    },
    photo: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    businessInfo: {
        businessName: {
            type: String,
            require: true
        }, businessType: {
            type: String,
            require: true
        },
        businessHours: {
            type: String,
            require: true
        },
        businessAddress: {
            type: String,
            require: true
        },
        businessPhone: {
            type: String,
            minlength: 6,
            maxlength: 13
        },
        businessEmail: {
            type: String,
            require: true,
            trim: true,
            validator: validator.isEmail,
            message: '{value} is not valid'
        },
        taxPayerId: {
            type: String,
            require: true
        }
    },
    subscription: {
        pricing: {
            type: String,
            require: true
        },
        subscriptionDate: {
            type: Date,
        },
        cardDetail: {
            cardType: {
                type: String,
                require: true
            },
            cardNumber: {
                type: String,
                require: true
            },
            expiresOn: {
                type: String,
                require: true
            },
            securityCode: {
                type: String,
                require:true
            },
            postalCode: {
                type: Number,
                maxlength: 6
            },
            country: {
                type: String
            }
        }
    }
});
//Password Hashing
businessOwnerSchema.pre('save', function (next) {
    let businessOwner = this;
    if (businessOwner.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(businessOwner.password, salt, (err, hash) => {
                if (err) {
                    return err;
                }
                if (hash) {
                    businessOwner.password = hash;
                    next();
                }
            })
        })
    }
    else {
        next();
    }

});

//Find Business Owner By Token
businessOwnerSchema.statics.findByToken = function (token) {
    let businessOwner = this;
    let decoded = '';
    try {
        decoded = jwt.verify(token, 'outreachfunds');
    } catch (e) {
        return e;
    }
    console.log("Decode",decoded)
    return businessOwner.findOne({
        _id:decoded._id,
        email:decoded.email,
        password:decoded.password
    })
}
let businessOwner = mongoose.model('businessOwner', businessOwnerSchema);
module.exports = {businessOwner};
