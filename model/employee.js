const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = mongoose.Schema({
    employeeId: {
        type: Number,
        unique: true,
    },
    fullname: {
        type: String
    },
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    resaddress: {
        type: String,
        trim: true
    },
    curraddress: {
        type: String,
        trim: true
    },

    aaadhar: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },

    accountno: {
        type: Number
    },
    nameinbank: {
        type: String,
        trim: true
    },
    ifsc: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        enum: ['National Manager',
            'Zonal Manager',
            'Regional Manager',
            'area sales manager',
            'Sales Officer',
            'Salesman',]
    },



    password: {
        type: String,
        trim: true,
        private: true
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now(),
        private: true
    },
    phonenumber: {
        type: String,
        trim: true,
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        trim: true
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female']
    },
    dp: {
        type: String,
        default: '/pic/default.webp'
    },

    imie: {
        type: String
    },
    role: {
        type: String
    },
    for: {
        type: String,  //agencies - distribution
    },
    hierarchy: {
        type: String
    },
    logindetail: [
        {
            type: Date,
        }
    ],
    reportingmanager: [{
        type: String
    }],
    createdBy: {
        type: String
    },
    sale: {
        type: Boolean,
        default: false
    },
    collections: {
        type: Boolean,
        default: false
    },
    activity: {
        type: Boolean,
        default: false
    },
    pop: {
        type: Boolean,
        default: false
    },
    bid: {
        type: Boolean,
        default: false
    },
    outletEFSCH: {
        type: Boolean,
        default: false
    },
    assettrack: {
        type: Boolean,
        default: false
    },
    assetorder: {
        type: Boolean,
        default: false
    },
    addtask: {
        type: Boolean,
        default: false
    },
    order: {
        type: Boolean,
        default: false
    },
    printreciept: {
        type: Boolean,
        default: false
    },
    attendence: {
        type: Boolean,
        default: false
    },
    claims: {
        type: Boolean,
        default: false
    },
    activitypicture: {
        type: Boolean,
        default: false
    },
    emailretailer: {
        type: Boolean,
        default: false
    },
    orderFullfill: {
        type: Boolean,
        default: false
    },
    existingassets: {
        type: Boolean,
        default: false
    },
    emailpacreport: {
        type: Boolean,
        default: false
    },
    salereturn: {
        type: Boolean,
        default: false
    },
    captureads: {
        type: Boolean,
        default: false
    },
    attendenceimage: {
        type: Boolean,
        default: false
    },
    genericform: {
        type: Boolean,
        default: false
    },
    activitycomments: {
        type: Boolean,
        default: false
    },
    leadmgmtsys: {
        type: Boolean,
        default: false
    },
    editoutlet: {
        type: Boolean,
        default: false
    },
    reqfordiscount: {
        type: Boolean,
        default: false
    },
    stockatoutlet: {
        type: Boolean,
        default: false
    },
    addoutlet: {
        type: Boolean,
        default: false
    },
    collateral: {
        type: Boolean,
        default: false
    },
    showoutletageing: {
        type: Boolean,
        default: false
    },
    activityform: {
        type: Boolean,
        default: false
    },
    readgeoloc: {
        type: Boolean,
        default: false
    },
    tasks: {
        type: Boolean,
        default: false
    },
    assetaudit: {
        type: Boolean,
        default: false
    },
    shownearestoutlet: {
        type: Boolean,
        default: false
    },
    printertype: {
        type: Boolean,
        default: false
    },
    editoutletloc: {
        type: Boolean,
        default: false
    },
    enrollwtarget: {
        type: Boolean,
        default: false
    },
    stocktransfer: {
        type: Boolean,
        default: false
    },
    taskapprover: {
        type: Boolean,
        default: false
    },
    assetderegister: {
        type: Boolean,
        default: false
    },
    primaryorder: {
        type: Boolean,
        default: false
    },
    entersliceprice: {
        type: Boolean,
        default: false
    },
    sampling: {
        type: Boolean,
        default: false
    },
    primaryactivityform: {
        type: Boolean,
        default: false
    },
    createeditevent: {
        type: Boolean,
        default: false
    },
    assetapprover: {
        type: Boolean,
        default: false
    },
    primarysalereturn: {
        type: Boolean,
        default: false
    },
    edituserlocvis: {
        type: Boolean,
        default: false
    },
    edituserinfo: {
        type: Boolean,
        default: false
    },
    reporteeview: {
        type: Boolean,
        default: false
    },
    secondarygm: {
        type: Boolean,
        default: false
    },
    vansalewithorder: {
        type: Boolean,
        default: false
    },
    primarycollection: {
        type: Boolean,
        default: false
    },
    txninsinglescreen: {
        type: Boolean,
        default: false
    },
    beatplanning: {
        type: Boolean,
        default: false
    },
    trainer: {
        type: Boolean,
        default: false
    },
    claimauditor:{
        type: Boolean,
        default: false
    }












});













employeeSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

employeeSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
};

employeeSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

employeeSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const Employee = mongoose.model('Employee', employeeSchema);



module.exports = {
    Employee,
};