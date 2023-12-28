const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerInfoSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    message: {
        type: String, 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CustomerInfo = mongoose.model('CustomerInfo', CustomerInfoSchema);

module.exports = CustomerInfo;
