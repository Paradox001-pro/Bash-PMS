const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    report:{
        type: String,
    },
    identity:{
        type: String,
    },
    user:{
        type: String,
    },
    date:{
        type: Date,
        default:Date.now
    }
});

let Report = module.exports = mongoose.model('Report', ReportSchema);