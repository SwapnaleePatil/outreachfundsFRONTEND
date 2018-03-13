let mongoose = require('mongoose');
let validator = require('validator');
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
        unique: true,
        validator: validator.isEmail,
        message: '{value} is not valid'
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
            unique: true,
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
                type: Number,
                require: true
            },
            expiresOn: {
                type: Date,
                require: true
            },
            securityCode: {
                type: Number,
                minlength: 3
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
let businessOwner = mongoose.model('businessOwner', businessOwnerSchema);
module.exports = {businessOwner};
