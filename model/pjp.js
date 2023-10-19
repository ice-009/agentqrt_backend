const mongoose = require('mongoose')


const pjpSchema = mongoose.Schema({
    
    pjpId:{
        type:Number
    },
    plan:[{
        date:{
            type:Date
        },
        outletid:[{
            type:Number
        }]
    }],
    userId:{
        type:Number
    },
    

})