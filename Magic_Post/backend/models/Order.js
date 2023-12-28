const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: {
        type: String,
        unique: true
    },
    send_id: String,
    order_date: {
        type: Date,
        required: true
    },
    expected_date: Date,
    depot_code: String,
    Status: String


});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
