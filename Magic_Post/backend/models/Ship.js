const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipSchema = new Schema({
    send_id: String,
    send_date: Date,
    place_of_send: String,
    customer_id: String,

});

const Ship = mongoose.model('Ship', ShipSchema);

module.exports = Ship;
