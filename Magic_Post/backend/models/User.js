const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },
    FirstName: String,
    LastName: String,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Role: String,
    About: String,
    Avatar: String,
    PhoneNumber: String,
    StationCode: String,
    IdentityNo: String,
    DateOfBirth: Date,
    Gender: String,
    CreatedAt: Date,
    UpdatedAt: Date,
    LoginDate: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
