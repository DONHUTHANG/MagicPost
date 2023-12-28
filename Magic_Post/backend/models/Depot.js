const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepotSchema = new Schema({
    depot_id: Number,
    depot_code: String,
    depot_name: String,
    province: String,
    depot_url: String,
    depot_hotline: String,
    depot_address: String,
    depot_email: String,
    depot_manager: String,
});

const Depot = mongoose.model('Depot', DepotSchema);

module.exports = Depot;
