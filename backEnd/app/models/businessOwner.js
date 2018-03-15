let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt=require('bcryptjs');
let jwt=require('jsonwebtoken');
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
    },
    tokens:[{
        auth:String,
        token:String
    }]
});
businessOwnerSchema.pre('save',function (next) {
    let businessOwner=this;
    if(businessOwner.isModified('password'))
    {
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(businessOwner.password,salt,(err,hash)=>{
                if(err)
                {
                    console.log("Error:=",err);
                }
                if(hash)
                {
                    businessOwner.password=hash;
                    next();
                }
            })
        })
    }
    else {
        next();
    }
})
businessOwnerSchema.methods.generateAuthToken=function(){
    var businessOwner=this;
    var access='auth';
    var token=jwt.sign(
        {
            _id:businessOwner._id.toHexString(),
            access
        },
        'abc123'
    ).toString();
    businessOwner.tokens.push({access,token});
    return businessOwner.save().then(()=>{
        console.log("Token",token)
        return token;
    })
}
let businessOwner = mongoose.model('businessOwner', businessOwnerSchema);
module.exports= {businessOwner};
